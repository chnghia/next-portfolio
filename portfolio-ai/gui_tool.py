import tkinter as tk
from tkinter import filedialog, messagebox, simpledialog
import os
import json
from PIL import Image, ImageTk
import cv2
import base64
import io
import json
import requests

class ProjectEditor:
    def __init__(self, master):
        self.master = master
        self.master.title("Project Asset Editor")
        self.master.geometry("1200x700")
        # Keep handles for video preview playback
        self.video_cap = None
        self.video_after_id = None

        self.folder_path = ""
        self.files = []
        self.current_file_index = 0
        self.project_data = {}
        self.existing_files = set()

        # --- Widgets ---
        # Top Frame for controls
        top_frame = tk.Frame(self.master)
        top_frame.pack(pady=10)

        self.btn_select_folder = tk.Button(top_frame, text="Select Asset Folder", command=self.select_folder)
        self.btn_select_folder.pack(side=tk.LEFT, padx=5)

        self.btn_save = tk.Button(top_frame, text="Save to projects.json", command=self.save_data, state=tk.DISABLED)
        self.btn_save.pack(side=tk.LEFT, padx=5)

        self.btn_analyze = tk.Button(top_frame, text="Analyze (AI)", command=self.analyze_current_file, state=tk.DISABLED)
        self.btn_analyze.pack(side=tk.LEFT, padx=5)

        # Main content frame
        content_frame = tk.Frame(self.master)
        content_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        # Fix left column width, let middle/right expand
        content_frame.grid_columnconfigure(0, weight=0, minsize=320)  # file list fixed width
        content_frame.grid_columnconfigure(1, weight=2, minsize=400)  # media preview
        content_frame.grid_columnconfigure(2, weight=1)  # project info
        content_frame.grid_rowconfigure(0, weight=1)

        # Left side: list videos/files
        list_frame = tk.Frame(content_frame, bd=2, relief=tk.SUNKEN)
        list_frame.grid(row=0, column=0, sticky="nsew", padx=(0, 5))
        list_frame.grid_propagate(False)  # honor fixed minsize from parent grid
        list_frame.grid_rowconfigure(0, weight=1)
        list_frame.grid_columnconfigure(0, weight=1)
        scrollbar = tk.Scrollbar(list_frame, orient=tk.VERTICAL)
        self.file_listbox = tk.Listbox(list_frame, width=30, yscrollcommand=scrollbar.set)
        scrollbar.config(command=self.file_listbox.yview)
        self.file_listbox.grid(row=0, column=0, sticky="nsew")
        scrollbar.grid(row=0, column=1, sticky="ns")
        self.file_listbox.bind('<<ListboxSelect>>', self.on_file_select)

        # Middle: Media display (thumbnail / video preview)
        media_frame = tk.Frame(content_frame, bd=2, relief=tk.SUNKEN)
        media_frame.grid(row=0, column=1, sticky="nsew", padx=(5, 5))
        self.media_label = tk.Label(media_frame, text="Select a file", anchor="center")
        # Center the content within available space
        self.media_label.place(relx=0.5, rely=0.5, anchor="center")
        # Use a container to let the label stay centered while frame expands
        media_frame.bind("<Configure>", lambda e: self.center_media_label())


        # Right side: JSON text input
        text_frame = tk.Frame(content_frame, bd=2, relief=tk.SUNKEN)
        text_frame.grid(row=0, column=2, sticky="nsew", padx=(5, 0))
        self.json_text = tk.Text(text_frame, wrap=tk.WORD, font=("Courier New", 12))
        self.json_text.pack(fill=tk.BOTH, expand=True)
        self.json_text.bind("<<Modified>>", self.on_text_change)


        # Bottom Frame for navigation
        bottom_frame = tk.Frame(self.master)
        bottom_frame.pack(pady=10)

        self.btn_prev = tk.Button(bottom_frame, text="<< Previous", command=self.prev_file, state=tk.DISABLED)
        self.btn_prev.pack(side=tk.LEFT, padx=5)

        self.lbl_file_info = tk.Label(bottom_frame, text="No folder selected")
        self.lbl_file_info.pack(side=tk.LEFT, padx=10)

        self.btn_next = tk.Button(bottom_frame, text="Next >>", command=self.next_file, state=tk.DISABLED)
        self.btn_next.pack(side=tk.LEFT, padx=5)

    def select_folder(self):
        folder_path = filedialog.askdirectory()
        if not folder_path:
            return

        self.folder_path = folder_path
        supported_ext = ('.png', '.jpg', '.jpeg', '.gif', '.mp4', '.mov', '.avi')
        collected = []
        for root, _dirs, files in os.walk(self.folder_path):
            for f in files:
                if f.lower().endswith(supported_ext):
                    rel_path = os.path.relpath(os.path.join(root, f), self.folder_path)
                    collected.append(rel_path)
        self.files = sorted(collected)

        if self.files:
            self.current_file_index = 0
            self.load_project_data()
            self.refresh_file_listbox()
            self.update_view()
            self.btn_save.config(state=tk.NORMAL)
            self.btn_next.config(state=tk.NORMAL if len(self.files) > 1 else tk.DISABLED)
            self.btn_prev.config(state=tk.DISABLED)
            self.btn_analyze.config(state=tk.NORMAL)
        else:
            messagebox.showinfo("No Media Found", "No supported image or video files found in the selected folder.")
            self.lbl_file_info.config(text="No media files found.")
            self.btn_save.config(state=tk.DISABLED)
            self.btn_next.config(state=tk.DISABLED)
            self.btn_prev.config(state=tk.DISABLED)
            self.btn_analyze.config(state=tk.DISABLED)

    def update_view(self):
        if not self.files:
            return

        file_name = self.files[self.current_file_index]
        file_path = os.path.join(self.folder_path, file_name)
        
        self.file_listbox.selection_clear(0, tk.END)
        self.file_listbox.selection_set(self.current_file_index)
        self.file_listbox.activate(self.current_file_index)
        self.file_listbox.see(self.current_file_index)


        # Display media
        self.display_media(file_path)

        # Display JSON
        self.json_text.delete("1.0", tk.END)
        
        current_data = self.project_data.get(file_name)
        if not current_data:
            current_data = self.get_default_project_template(file_name)
            # keep an editable copy in memory so template is persisted if user saves
            self.project_data[file_name] = current_data.copy()
        
        # Pretty print the JSON data into the text box
        self.json_text.insert("1.0", json.dumps(current_data, indent=4))


        # Update label
        self.lbl_file_info.config(text=f"{self.current_file_index + 1} / {len(self.files)}: {file_name}")
        
        # Update button states
        self.btn_prev.config(state=tk.NORMAL if self.current_file_index > 0 else tk.DISABLED)
        self.btn_next.config(state=tk.NORMAL if self.current_file_index < len(self.files) - 1 else tk.DISABLED)

    def display_media(self, file_path):
        self.stop_video_preview()
        try:
            if file_path.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                img = Image.open(file_path)
                img.thumbnail(self.get_media_label_size())
                photo = ImageTk.PhotoImage(img)
                self.media_label.config(image=photo)
                self.media_label.image = photo
                self.media_label.config(text="")
            elif file_path.lower().endswith(('.mp4', '.mov', '.avi')):
                cap = cv2.VideoCapture(file_path)
                if cap.isOpened():
                    self.video_cap = cap
                    self.play_next_video_frame()
                else:
                    self.media_label.config(text="Cannot open video", image="")
                    self.media_label.image = None
        except Exception as e:
            self.media_label.config(text=f"Error loading media:\n{e}", image='')
            self.media_label.image = None


    def next_file(self):
        if self.current_file_index < len(self.files) - 1:
            self.save_current_text()
            self.current_file_index += 1
            self.update_view()

    def prev_file(self):
        if self.current_file_index > 0:
            self.save_current_text()
            self.current_file_index -= 1
            self.update_view()
            
    def on_file_select(self, event):
        selection = event.widget.curselection()
        if selection:
            index = selection[0]
            if index != self.current_file_index:
                self.save_current_text()
                self.current_file_index = index
                self.update_view()
        else:
            # keep focus on current file if selection cleared
            self.file_listbox.selection_set(self.current_file_index)

    def save_current_text(self):
        if not self.files:
            return
        file_name = self.files[self.current_file_index]
        content = self.json_text.get("1.0", tk.END).strip()
        if content:
            try:
                # Validate if it's proper JSON
                data = json.loads(content)
                self.project_data[file_name] = data
            except json.JSONDecodeError:
                # Handle case where text is not valid JSON
                # Maybe show a warning, for now, we save it as is
                # Or decide on a better strategy
                pass # Or self.project_data[file_name] = {"raw_text": content}
        else:
            # If the text box is empty, remove the entry
            if file_name in self.project_data:
                del self.project_data[file_name]
                
    def on_text_change(self, event):
        # This is a bit tricky because this event fires on every change.
        # We can set a flag that the text has been modified.
        # The <<Modified>> event needs to be reset manually.
        self.json_text.edit_modified(False)


    def save_data(self):
        self.save_current_text() # Save the currently displayed text one last time
        if not self.project_data:
            messagebox.showwarning("No Data", "There is no data to save.")
            return

        output_path = os.path.join(self.folder_path, "projects.json")
        
        # Transform the dictionary into the desired list format
        output_list = []
        for file_name, data in self.project_data.items():
            # We assume the user's JSON includes all necessary fields.
            # We just add the file path.
            entry = data.copy()
            entry['file_path'] = file_name 
            output_list.append(entry)

        try:
            with open(output_path, 'w') as f:
                json.dump(output_list, f, indent=4)
            # Mark all current entries as persisted
            self.existing_files = set(self.project_data.keys())
            self.refresh_file_listbox()
            messagebox.showinfo("Success", f"Data saved successfully to {output_path}")
        except Exception as e:
            messagebox.showerror("Error Saving File", f"An error occurred: {e}")

    def load_project_data(self):
        project_json_path = os.path.join(self.folder_path, "projects.json")
        if os.path.exists(project_json_path):
            try:
                with open(project_json_path, 'r') as f:
                    loaded_list = json.load(f)
                    # Convert list back to dictionary for easy lookup; key by stored file_path (relative)
                    self.project_data = {}
                    for item in loaded_list:
                        key = item.get('file_path', '')
                        if key:
                            self.project_data[key] = item
                    self.existing_files = set(self.project_data.keys())
            except (json.JSONDecodeError, KeyError) as e:
                messagebox.showwarning("Load Error", f"Could not load or parse existing projects.json. A new one will be created on save.\nError: {e}")
                self.project_data = {}
                self.existing_files = set()
        else:
            self.existing_files = set()

    # Helpers
    def get_media_label_size(self):
        # Provide a sensible size even before the widget is rendered
        width = max(self.media_label.winfo_width(), 600)
        height = max(self.media_label.winfo_height(), 400)
        return (width, height)

    def get_default_project_template(self, file_name):
        file_ext = os.path.splitext(file_name)[1].lower()
        file_type = "video" if file_ext in ('.mp4', '.mov', '.avi') else "image"
        stem = os.path.splitext(file_name)[0]
        rel_path = os.path.join(os.path.basename(self.folder_path), file_name) if self.folder_path else file_name
        return {
            "id": stem,
            "project_name": "",
            "file_path": rel_path,
            "file_type": file_type,
            "thumbnail": f"thumbnails/{stem}.jpg",
            "description": "",
            "application_domain": "",
            "model_architecture": "",
            "results": "",
            "tags": []
        }

    def stop_video_preview(self):
        if self.video_after_id:
            self.media_label.after_cancel(self.video_after_id)
            self.video_after_id = None
        if self.video_cap:
            self.video_cap.release()
            self.video_cap = None

    def play_next_video_frame(self):
        if not self.video_cap:
            return
        ret, frame = self.video_cap.read()
        if not ret:
            # loop the preview
            self.video_cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            ret, frame = self.video_cap.read()
        if ret:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            img = Image.fromarray(frame)
            img.thumbnail(self.get_media_label_size())
            photo = ImageTk.PhotoImage(img)
            self.media_label.config(image=photo, text="")
            self.media_label.image = photo
            self.video_after_id = self.media_label.after(120, self.play_next_video_frame)
        else:
            self.media_label.config(text="Cannot read video", image="")
            self.media_label.image = None

    def center_media_label(self):
        # Keep label centered as the frame resizes
        if self.media_label.winfo_manager() == "place":
            self.media_label.place_configure(relx=0.5, rely=0.5, anchor="center")

    # --- AI Analysis ---
    def analyze_current_file(self):
        """
        Run local-LLM analysis via LM Studio (OpenAI-compatible API) on port 1234.
        Tested with vision-capable models; default is set below. Adjust MODEL_NAME if your server uses another name.
        """
        if not self.files:
            return

        file_name = self.files[self.current_file_index]
        file_path = os.path.join(self.folder_path, file_name)

        try:
            images_payload = self.prepare_images_for_ai(file_path)
        except Exception as e:
            messagebox.showerror("Prep failed", f"Could not prepare media for analysis:\n{e}")
            return

        if not images_payload:
            messagebox.showwarning("No frames", "Could not extract frames/images to analyze.")
            return

        self.btn_analyze.config(state=tk.DISABLED)
        self.master.update_idletasks()

        try:
            MODEL_NAME = os.getenv("LM_STUDIO_MODEL", "qwen/qwen3-vl-30b")
            prompt = (
                "You are an assistant that inspects the provided media frames and returns a concise JSON object "
                "with these fields: "
                "description (1-2 sentences), application_domain (industry/use case), "
                "model_architecture (best guess of AI/ML technique), results (optional inferred outcomes), "
                "tags (list of short keywords). "
                "Keep keys exactly as named and omit extra commentary. Return JSON only."
            )
            user_content = [{"type": "text", "text": "Analyze these frames and fill the JSON."}]
            user_content.extend(images_payload)

            payload = {
                "model": MODEL_NAME,  # load a matching model name in LM Studio
                "messages": [
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": user_content},
                ],
                "temperature": 0.2,
            }
            resp = requests.post("http://172.16.0.25:1234/v1/chat/completions", json=payload, timeout=120)
            resp.raise_for_status()
            data = resp.json()
            ai_text = data["choices"][0]["message"]["content"].strip()
            ai_json = self.safe_extract_json(ai_text)
            if not ai_json:
                raise ValueError("Model response was not valid JSON.")

            current_data = self.project_data.get(file_name, self.get_default_project_template(file_name))
            current_data.update({k: v for k, v in ai_json.items() if k in current_data})
            self.project_data[file_name] = current_data

            self.json_text.delete("1.0", tk.END)
            self.json_text.insert("1.0", json.dumps(current_data, indent=4))
            messagebox.showinfo("Analysis complete", "AI analysis updated the project info.")
        except Exception as e:
            messagebox.showerror("Analysis error", f"AI analysis failed:\n{e}")
        finally:
            self.btn_analyze.config(state=tk.NORMAL)

    def prepare_images_for_ai(self, file_path, max_frames=3):
        ext = os.path.splitext(file_path)[1].lower()
        payloads = []
        if ext in ('.png', '.jpg', '.jpeg'):
            img = Image.open(file_path)
            payloads.append(self.image_to_payload(img))
        elif ext == '.gif':
            try:
                img = Image.open(file_path)
                # Extract up to max_frames frames spread across the GIF
                frame_indices = self.pick_frame_indices(getattr(img, "n_frames", 1), max_frames)
                for idx in frame_indices:
                    try:
                        img.seek(idx)
                        payloads.append(self.image_to_payload(img))
                    except EOFError:
                        break
            except Exception:
                raise RuntimeError("Cannot read GIF frames.")
        elif ext in ('.mp4', '.mov', '.avi'):
            cap = cv2.VideoCapture(file_path)
            if not cap.isOpened():
                raise RuntimeError("Cannot open video.")
            total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
            frame_ids = self.pick_frame_indices(total, max_frames)
            for fid in frame_ids:
                cap.set(cv2.CAP_PROP_POS_FRAMES, fid)
                ret, frame = cap.read()
                if not ret:
                    continue
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                img = Image.fromarray(frame)
                payloads.append(self.image_to_payload(img))
            cap.release()
        else:
            raise ValueError("Unsupported file type for analysis.")
        return payloads

    def image_to_payload(self, img):
        img = img.copy().convert("RGB")  # ensure 3-channel; fixes RGBA/LA/P modes
        img.thumbnail((640, 640))
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=85)
        b64 = base64.b64encode(buf.getvalue()).decode("utf-8")
        return {
            "type": "image_url",
            "image_url": {"url": f"data:image/jpeg;base64,{b64}"}
        }

    def pick_frame_indices(self, total_frames, max_frames):
        if total_frames <= 0:
            return [0]
        if total_frames <= max_frames:
            return list(range(total_frames))
        step = total_frames // (max_frames + 1)
        return [step * (i + 1) for i in range(max_frames)]

    def safe_extract_json(self, text):
        try:
            # Strip code fences if present
            if text.startswith("```"):
                text = text.split("```", 2)[1]
                # remove possible json\n prefix
                text = text.split('\n', 1)[1] if '\n' in text else text
            return json.loads(text)
        except Exception:
            return None

    def refresh_file_listbox(self):
        """Refresh list labels with check mark when file already in projects.json."""
        current_sel = self.current_file_index
        self.file_listbox.delete(0, tk.END)
        for f in self.files:
            mark = "✓ " if f in self.existing_files else "  "
            self.file_listbox.insert(tk.END, f"{mark}{f}")
        if 0 <= current_sel < len(self.files):
            self.file_listbox.selection_set(current_sel)
            self.file_listbox.activate(current_sel)
            self.file_listbox.see(current_sel)


if __name__ == "__main__":
    root = tk.Tk()
    app = ProjectEditor(root)
    root.mainloop()
