const axios = require('axios');
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// --- CONFIGURATION ---
const LM_STUDIO_API_URL = "http://172.16.0.25:1234/v1/chat/completions";
const DEFAULT_TEMPLATE_PATH = path.join("content", "prompt", "prompt_template.md");
const DEFAULT_POST_PROMPT_PATH = path.join("content", "prompt", "post_001.md");
const OUTPUT_DIR = path.join("content", "blog");

/**
 * Parses a markdown file containing multiple post prompts separated by '---'.
 * @param {string} filepath - The path to the post prompt file.
 * @returns {Array<Object>} An array of post data objects.
 */
function parsePostPrompts(filepath) {
    try {
        const content = fs.readFileSync(filepath, 'utf-8');
        const posts = [];
        const postBlocks = content.trim().split('---');

        for (const block of postBlocks) {
            if (!block.trim()) continue;

            const postData = {};
            // Regex to find key-value pairs, including multi-line main_points
            const pattern = /(\w+):\s*(?:"(.*?)"|\|([\s\S]*?)(?=\n\w+:|\s*$))/g;
            
            let match;
            while ((match = pattern.exec(block)) !== null) {
                const key = match[1].trim();
                const quotedValue = match[2];
                const multilineValue = match[3];

                if (multilineValue) {
                    // For main_points, clean up the multiline string
                    postData[key] = multilineValue.trim().split('\n').map(line => line.trim()).join('\n');
                } else {
                    postData[key] = quotedValue ? quotedValue.trim() : '';
                }
            }

            if (Object.keys(postData).length > 0) {
                posts.push(postData);
            }
        }
        return posts;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Error: File not found ${filepath}`);
        } else {
            console.error(`Error reading or parsing file ${filepath}:`, error);
        }
        return [];
    }
}

/**
 * Sends a prompt to the LM Studio API and returns the generated content.
 * @param {string} prompt - The complete prompt to send to the AI.
 * @returns {Promise<string|null>} The generated content or null if an error occurs.
 */
async function generateBlogPost(prompt) {
    const headers = { "Content-Type": "application/json" };
    const payload = {
        model: "openai/gpt-oss-120b", // Placeholder for LM Studio
        messages: [
            { role: "system", content: "You are a professional blog writing assistant." },
            { role: "user", content: prompt }
        ],
        temperature: 0.7,
        stream: false,
    };

    console.log("Sending request to LM Studio...");
    try {
        const response = await axios.post(LM_STUDIO_API_URL, payload, { headers, timeout: 300000 }); // 5-minute timeout
        const content = response.data.choices[0].message.content;
        console.log("Received response from AI.");
        return content;
    } catch (error) {
        console.error(`Error calling LM Studio API: ${error.message}`);
        console.error(`Please ensure LM Studio is running and accessible at ${LM_STUDIO_API_URL}`);
        return null;
    }
}

/**
 * Creates a markdown file with the given title and content.
 * @param {string} title - The title of the post.
 * @param {string} content - The markdown content of the post.
 */
function createMarkdownFile(title, content) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`Created directory: ${OUTPUT_DIR}`);
    }

    const filename = `${slugify(title, { lower: true, strict: true })}.md`;
    const filepath = path.join(OUTPUT_DIR, filename);

    try {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Successfully saved post to: ${filepath}`);
    } catch (error) {
        console.error(`Error writing file: ${error}`);
    }
}

/**
 * Main function to execute the entire workflow.
 */
async function main() {
    // Get file paths from command-line arguments, or use defaults
    const args = process.argv.slice(2);
    const templatePath = args[0] || DEFAULT_TEMPLATE_PATH;
    const postPromptPath = args[1] || DEFAULT_POST_PROMPT_PATH;

    let template;
    try {
        template = fs.readFileSync(templatePath, 'utf-8');
    } catch (error) {
        console.error(`Error: Template file not found at ${templatePath}`);
        return;
    }

    const postRequests = parsePostPrompts(postPromptPath);

    if (postRequests.length === 0) {
        console.log(`No post requests found in ${postPromptPath}`);
        return;
    }

    console.log(`Found ${postRequests.length} post requests.`);

    for (let i = 0; i < postRequests.length; i++) {
        const postInfo = postRequests[i];
        const title = postInfo.title || 'Untitled Post';
        console.log(`\n--- Processing post ${i + 1}/${postRequests.length}: ${title} ---`);

        // Trong hàm main() của generate_post.js
        const finalPrompt = template
            .replace(/{POST_TITLE}/g, title)
            .replace(/{EXCERPT}/g, postInfo.excerpt || '')
            .replace(/{DATE}/g, postInfo.date || new Date().toISOString().split('T')[0])
            .replace(/{TAGS}/g, postInfo.tags || '')
            .replace(/{COVER_IMAGE}/g, postInfo.cover_image || '')
            .replace(/{CONTENT_TYPE}/g, postInfo.content_type || 'SEO_POST')
            .replace(/{WRITING_STYLE}/g, postInfo.writing_style || 'Chuyên nghiệp, thân thiện')
            .replace(/{TARGET_AUDIENCE}/g, postInfo.target_audience || 'chung')
            .replace(/{MAIN_KEYWORD}/g, postInfo.main_keyword || '')
            .replace(/{IMAGE_SUGGESTIONS}/g, postInfo.image_suggestions || '')
            .replace(/{MAIN_POINTS}/g, postInfo.main_points || '')
            .replace(/{ORIGINAL_CONTENT}/g, postInfo.original_content || '');


        const generatedContent = await generateBlogPost(finalPrompt);

        if (generatedContent) {
            createMarkdownFile(title, generatedContent);
        }
    }
}

main();