#!/bin/bash

# Configuration
PROMPT_TEMPLATE="project_prompt.txt"
API_URL="http://172.16.0.25:1234/v1/chat/completions"
MODEL="openai/gpt-oss-120b" # Adjust if needed, or pass as arg

# Default method
METHOD="api"
USE_GEMINI=false
INPUT_FILE=""
OUTPUT_DIR="."

# Function to display usage
usage() {
    echo "Usage: $0 [OPTIONS] <project_info_file>"
    echo "Options:"
    echo "  -m, --method <api|cli>  Choose execution method (default: api)"
    echo "  --cli                   Shortcut for --method cli"
    echo "  --api                   Shortcut for --method api"
    echo "  --gemini                Use gemini-cli when in cli mode"
    echo "  -o, --output <dir>      Output directory (default: current directory)"
    echo "  -h, --help              Show this help message"
}

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -m|--method)
            if [[ -n "$2" && "$2" != -* ]]; then
                METHOD="$2"
                shift
            else
                echo "Error: --method requires an argument (api or cli)."
                exit 1
            fi
            ;;
        --cli)
            METHOD="cli"
            ;;
        --api)
            METHOD="api"
            ;;
        --gemini)
            USE_GEMINI=true
            ;;
        -o|--output)
            if [[ -n "$2" && "$2" != -* ]]; then
                OUTPUT_DIR="$2"
                shift
            else
                echo "Error: --output requires an argument."
                exit 1
            fi
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        -*)
            echo "Error: Unknown option: $1"
            usage
            exit 1
            ;;
        *)
            if [ -z "$INPUT_FILE" ]; then
                INPUT_FILE="$1"
            else
                echo "Error: Multiple input files specified."
                usage
                exit 1
            fi
            ;;
    esac
    shift
done

# Validate input file
if [ -z "$INPUT_FILE" ]; then
    echo "Error: No input file provided."
    usage
    exit 1
fi

if [ ! -f "$INPUT_FILE" ]; then
    echo "Error: Input file '$INPUT_FILE' not found."
    exit 1
fi

if [ ! -f "$PROMPT_TEMPLATE" ]; then
    echo "Error: Template file '$PROMPT_TEMPLATE' not found."
    exit 1
fi

# Create output directory if it doesn't exist
if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir -p "$OUTPUT_DIR"
fi

# Use input filename (without extension) as base filename
BASENAME=$(basename "$INPUT_FILE")
BASE_FILENAME="${BASENAME%.*}"

EXTENSION=".json"
if [ "$METHOD" == "cli" ] && [ "$USE_GEMINI" == "false" ]; then
    EXTENSION=".txt"
fi

FILENAME="${OUTPUT_DIR}/${BASE_FILENAME}${EXTENSION}"

echo "Processing file: $INPUT_FILE"
echo "Method: $METHOD"
echo "Output file: $FILENAME"

# Construct the prompt parts
# 1. Role (From start to just before # INPUT DATA)
PART_ROLE=$(sed -n '/^# ROLE/,/^# INPUT DATA/{/^# INPUT DATA/d;p;}' "$PROMPT_TEMPLATE")

# 2. Input Data (The header + the user file content)
PART_INPUT="# INPUT DATA
$(cat "$INPUT_FILE")"

# 3. Instructions (From # INSTRUCTIONS to end)
PART_INSTRUCTIONS=$(sed -n '/^# INSTRUCTIONS/,$p' "$PROMPT_TEMPLATE")

# Combine prompt
FULL_PROMPT="${PART_ROLE}
${PART_INPUT}
${PART_INSTRUCTIONS}"

CONTENT=""

if [ "$METHOD" == "cli" ]; then
    if [ "$USE_GEMINI" == "true" ]; then
        echo "Sending request to Gemini CLI..."
        
        TEMP_PROMPT_FILE=$(mktemp)
        echo "$FULL_PROMPT" > "$TEMP_PROMPT_FILE"

        # Use gemini CLI with stdin from temp file
        # Capture stdout only, ignore stderr (logs)
        CONTENT=$(cat "$TEMP_PROMPT_FILE" | gemini)
        
        EXIT_CODE=$?
        rm "$TEMP_PROMPT_FILE" # Clean up temp file
        
        if [ $EXIT_CODE -ne 0 ]; then
            echo "Error: Gemini CLI failed with exit code $EXIT_CODE."
            exit 1
        fi
    else
        echo "Saving full prompt to text file..."
        CONTENT="$FULL_PROMPT"
    fi

elif [ "$METHOD" == "api" ]; then
    # Escape for JSON string (basic escaping using jq)
    JSON_PAYLOAD=$(jq -n \
                      --arg content "$FULL_PROMPT" \
                      --arg model "$MODEL" \
                      '{
                        model: $model,
                        messages: [
                          {role: "user", content: $content}
                        ],
                        temperature: 0.7,
                        stream: false
                      }')

    echo "Sending request to LM Studio ($API_URL)..."
    echo "Using model: $MODEL"

    # Call API
    RESPONSE=$(curl -s -X POST "$API_URL" \
         -H "Content-Type: application/json" \
         -d "$JSON_PAYLOAD")

    # Check for curl error
    if [ $? -ne 0 ]; then
        echo "Error: Failed to connect to API."
        exit 1
    fi

    # Extract content
    CONTENT=$(echo "$RESPONSE" | jq -r '.choices[0].message.content')
else
    echo "Error: Invalid method '$METHOD'."
    exit 1
fi

if [ "$CONTENT" == "null" ] || [ -z "$CONTENT" ]; then
    echo "Error: Invalid or empty response."
    # For CLI, CONTENT might be empty if it failed silently or printed to stderr
    exit 1
fi

# Save to file
if [ "$METHOD" == "cli" ] && [ "$USE_GEMINI" == "false" ]; then
    echo "$CONTENT" > "$FILENAME"
else
    # Try to extract JSON if wrapped in code blocks (for API method or CLI gemini)
    CLEAN_JSON=$(echo "$CONTENT" | sed -n '/^{/,/^}/p')

    # If sed didn't find a block, maybe the whole content is JSON?
    if [ -z "$CLEAN_JSON" ]; then
        CLEAN_JSON="$CONTENT"
    fi
    echo "$CLEAN_JSON" > "$FILENAME"
fi

echo "Success! Saved to $FILENAME"
