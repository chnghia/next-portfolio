---
title: "Viết bài hiệu quả với Markdown"
excerpt: "Checklist nhanh để viết, kiểm thử và xuất bản bài blog kỹ thuật." 
date: "2024-10-05"
tags: ["Markdown", "Productivity"]
cover: "/showcases/tabica-1.png"
---

## Checklist trước khi publish

- [x] Đặt tiêu đề mô tả rõ giá trị của bài viết.  
- [x] Viết phần `excerpt` 1-2 câu để dùng cho card và meta description.  
- [x] Gắn tối đa 5 `tags` để lọc tìm kiếm.  
- [x] Chuẩn bị ít nhất một ảnh minh họa trong `public` để bài viết bắt mắt.

## Template front‑matter

```yaml
---
title: "Tên bài"
excerpt: "Mô tả ngắn"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
cover: "/duong-dan-toi-anh-trong-public.png"
---
```

## Mẹo định dạng

- **Heading rõ ràng:** mỗi H2 cho một ý chính, H3 cho checklist chi tiết.  
- **Code block:** dùng ```tsx hoặc ```bash để có syntax highlight.  
- **Ảnh:** chỉ cần `![alt text](/showcases/attendance-1.png)` là Next tự tối ưu khi render.  
- **Bảng:** Markdown hỗ trợ sẵn khi bật `remark-gfm`:

| Bước | Mô tả | Kết quả |
| --- | --- | --- |
| 1 | Viết nội dung | Có file `.md` | 
| 2 | Chạy build | Kiểm tra lỗi cú pháp | 
| 3 | Deploy | Trang blog tự cập nhật |

## Thói quen giúp viết nhanh

1. Brain dump ý chính trước, chưa cần trau chuốt.  
2. Tách nội dung thành mục nhỏ, mỗi mục 3-5 câu.  
3. Đọc lại một vòng, cắt bớt tính từ, thêm liên kết và ảnh.  
4. Kiểm tra trên môi trường preview để chắc chắn spacing ổn.

Giữ markdown đơn giản giúp nội dung rõ ràng và dễ bảo trì lâu dài.
