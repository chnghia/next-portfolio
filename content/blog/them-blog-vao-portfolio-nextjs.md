---
title: "Thêm trang blog vào portfolio Next.js"
excerpt: "Kinh nghiệm tạo trang danh sách và trang chi tiết dùng Markdown, dễ deploy lên GitHub Pages."
date: "2024-11-20"
tags: ["Next.js", "Markdown", "Portfolio"]
cover: "/showcases/portfolio-1.png"
---

## Vì sao mình thêm blog?

Portfolio vốn chỉ có giới thiệu, dự án và thông tin liên hệ. Blog giúp mình ghi lại quá trình làm việc, tổng hợp kiến thức và gửi link cho đồng nghiệp hoặc recruiter đọc nhanh. Mình muốn cách viết bài giống hệt khi viết README: chỉ cần một file `.md` là xong.

## Cách tổ chức nội dung

- Mỗi bài nằm trong thư mục `content/blog` với tên file theo `slug`. 
- Front‑matter (phần mở đầu) chứa `title`, `excerpt`, `date`, `tags`, `cover`. 
- Ảnh bìa và ảnh minh họa đặt ở thư mục `public`, ví dụ ảnh bìa đang dùng: `![Ảnh bìa](/showcases/portfolio-1.png)`.

![Wireframe page](/showcases/portfolio-2.png)

## Luồng render ở trang list

1. Đọc tất cả file `.md` bằng `fs` và `gray-matter` để lấy meta.  
2. Sắp xếp theo `date` giảm dần.  
3. Hiển thị bằng một thẻ card, gồm ảnh bìa, tiêu đề, tóm tắt, ngày và thời gian đọc.

## Luồng render ở trang chi tiết

1. Dựa trên `slug` lấy đúng file markdown.  
2. Render nội dung bằng `react-markdown` + `remark-gfm` để hỗ trợ bảng, danh sách, code block.  
3. Tuân thủ basePath của GitHub Pages nên ảnh trong markdown tự được prefix.

## Kinh nghiệm nhỏ

- Khi viết trong VS Code, bật preview Markdown để kiểm tra nhanh heading và list.  
- Nội dung càng dài thì front‑matter `excerpt` càng quan trọng cho SEO và card.  
- Ảnh trong thư mục `public` giúp Next/Image không phải import thủ công và vẫn được tối ưu ở runtime.

Hy vọng phần chia sẻ này giúp bạn dựng blog nhanh, giữ nguyên phong cách tối giản của portfolio.
