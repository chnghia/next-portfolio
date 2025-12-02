import websocket # pip install websocket-client
import uuid
import json
import urllib.request
import urllib.parse
import requests
import sys
import os

# --- CẤU HÌNH ---
SERVER_ADDRESS = "172.16.0.25:8188"
CLIENT_ID = str(uuid.uuid4())
WORKFLOW_FILE = "upscaler-creative_api.json" # File bạn đã export ở Bước 1
INPUT_NODE_ID = "10"  # ID của node Load Image (Thay đổi theo file json của bạn)
OUTPUT_NODE_ID = "62" # ID của node Save Image (Thay đổi theo file json của bạn)

def queue_prompt(prompt):
    p = {"prompt": prompt, "client_id": CLIENT_ID}
    data = json.dumps(p).encode('utf-8')
    req =  urllib.request.Request("http://{}/prompt".format(SERVER_ADDRESS), data=data)
    return json.loads(urllib.request.urlopen(req).read())

def get_image(filename, subfolder, folder_type):
    data = {"filename": filename, "subfolder": subfolder, "type": folder_type}
    url_values = urllib.parse.urlencode(data)
    with urllib.request.urlopen("http://{}/view?{}".format(SERVER_ADDRESS, url_values)) as response:
        return response.read()

def get_history(prompt_id):
    with urllib.request.urlopen("http://{}/history/{}".format(SERVER_ADDRESS, prompt_id)) as response:
        return json.loads(response.read())

def upload_image(input_path):
    files = {"image": open(input_path, 'rb')}
    response = requests.post("http://{}/upload/image".format(SERVER_ADDRESS), files=files)
    return response.json()

def process_image(image_path, output_path):
    print(f"[*] Đang upload ảnh: {image_path}...")

    # 1. Upload ảnh
    upload_resp = upload_image(image_path)
    filename = upload_resp["name"] # Tên file trên server comfy

    # 2. Load và sửa workflow
    with open(WORKFLOW_FILE, "r", encoding="utf-8") as f:
        prompt_workflow = json.load(f)

    # Trỏ node LoadImage vào file vừa upload
    prompt_workflow[INPUT_NODE_ID]["inputs"]["image"] = filename

    # Tăng tính ngẫu nhiên (nếu workflow dùng seed)
    # prompt_workflow["K_Sampler_ID"]["inputs"]["seed"] = random.randint(1, 1000000000)

    # 3. Kết nối WebSocket để lắng nghe trạng thái
    ws = websocket.WebSocket()
    ws.connect("ws://{}/ws?clientId={}".format(SERVER_ADDRESS, CLIENT_ID))

    print("[*] Đang gửi lệnh upscale...")
    prompt_id = queue_prompt(prompt_workflow)['prompt_id']

    # 4. Chờ xử lý
    current_node = ""
    while True:
        out = ws.recv()
        if isinstance(out, str):
            message = json.loads(out)
            if message['type'] == 'executing':
                data = message['data']
                if data['node'] is None and data['prompt_id'] == prompt_id:
                    break # Hoàn thành
                elif data['node'] is not None:
                    current_node = data['node']
                    print(f"    -> Đang chạy node: {current_node}")
        else:
            continue

    # 5. Lấy ảnh kết quả
    print("[*] Xử lý xong. Đang tải ảnh về...")
    history = get_history(prompt_id)[prompt_id]

    # Tìm ảnh output từ node SaveImage
    for node_id in history['outputs']:
        node_output = history['outputs'][node_id]
        if "images" in node_output:
            for image in node_output['images']:
                # Chỉ lấy ảnh nếu node đó là node OUTPUT mong muốn (hoặc lấy tất cả cũng được)
                if node_id == OUTPUT_NODE_ID or OUTPUT_NODE_ID == "ALL":
                    image_data = get_image(image['filename'], image['subfolder'], image['type'])

                    # Lưu file
                    final_path = output_path if output_path else f"upscaled_{image['filename']}"
                    with open(final_path, "wb") as f:
                        f.write(image_data)
                    print(f"[SUCCESS] Đã lưu ảnh tại: {final_path}")
                    return

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python upscale_cli.py <input_image_path> [output_image_path]")
        sys.exit(1)

    input_img = sys.argv[1]
    output_img = sys.argv[2] if len(sys.argv) > 2 else None

    if os.path.exists(input_img):
        process_image(input_img, output_img)
    else:
        print("File không tồn tại!")
