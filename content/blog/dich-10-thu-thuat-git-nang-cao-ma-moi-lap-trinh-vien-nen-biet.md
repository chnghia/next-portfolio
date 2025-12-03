---
title: "Dịch: 10 Thủ thuật Git nâng cao mà mọi lập trình viên nên biết"
excerpt: "{EXCERPT}"
date: "{DATE}"
tags: [{TAGS}]
cover: "{COVER_IMAGE}"
---

## Giới thiệu

Bài viết này là bản dịch tiếng Việt của một bài hướng dẫn **“10 Advanced Git Tricks Every Developer Should Know”** được đăng trên một blog công nghệ quốc tế. Mục đích của việc dịch là giúp cộng đồng lập trình viên nói tiếng Việt tiếp cận nhanh chóng những kỹ thuật Git nâng cao, tăng năng suất và giảm thiểu lỗi trong quá trình làm việc với hệ thống quản lý mã nguồn phân tán này.

Bản gốc cung cấp các thủ thuật từ việc tối ưu hoá lịch sử commit cho tới cách khai thác sức mạnh của `git rebase`, `git reflog` và nhiều lệnh ít người biết đến. Nhờ bản dịch, bạn sẽ nắm bắt được những kiến thức quan trọng mà không cần phải đọc tiếng Anh.

> **Lưu ý:** Nội dung dưới đây đã được dịch nguyên văn, giữ nguyên cấu trúc markdown, tiêu đề, danh sách và khối code của bài gốc.

## 1. Sử dụng `git stash` với các tùy chọn nâng cao

```bash
# Lưu thay đổi hiện tại vào một stash có tên
git stash push -m "my-feature-work"

# Xem danh sách các stash đã lưu
git stash list

# Áp dụng lại stash cụ thể và xóa nó khỏi danh sách
git stash pop stash@{2}
```

- **Mẹo:** Dùng `--include-untracked` để đồng thời lưu cả các file chưa được theo dõi.

## 2. Tái viết lịch sử commit bằng `git rebase -i`

```bash
# Mở giao diện tương tác cho 5 commit gần nhất
git rebase -i HEAD~5
```

- Chọn **squash** để gộp các commit lại.
- Sử dụng **edit** để chỉnh sửa nội dung hoặc thông điệp của một commit.

## 3. Khôi phục file đã xóa bằng `git checkout -- <file>`

```bash
# Lấy lại phiên bản cuối cùng của file bị xóa
git checkout HEAD -- src/utils/helpers.js
```

- Đây là cách nhanh chóng khôi phục các thay đổi mà không cần tạo một commit mới.

## 4. Tìm kiếm lịch sử commit với `git log` và các tùy chọn lọc

```bash
# Hiển thị các commit chứa từ khóa "authentication"
git log --grep="authentication" -p
```

- Thêm `--author="John Doe"` để chỉ xem các commit của một tác giả cụ thể.

## 5. Kiểm tra những gì đã thay đổi so với remote bằng `git fetch` + `git diff`

```bash
# Lấy về các thay đổi mới nhất từ remote mà chưa merge
git fetch origin

# So sánh nhánh hiện tại với remote/master
git diff HEAD..origin/master
```

## 6. Sử dụng `git reflog` để khôi phục commit bị mất

```bash
# Xem lịch sử tham chiếu của HEAD
git reflog

# Reset về một điểm trong reflog
git reset --hard HEAD@{3}
```

- **Reflog** là công cụ cứu cánh khi bạn vô tình `reset` hoặc `rebase` sai.

## 7. Tạo alias cho các lệnh Git phức tạp

```bash
# Thêm vào file .gitconfig
[alias]
    co = checkout
    br = branch
    ci = commit
    st = status
    amend = commit --amend --no-edit
```

- Giúp giảm thời gian gõ lệnh và tránh lỗi chính tả.

## 8. Sử dụng `git bisect` để tìm commit gây bug

```bash
# Bắt đầu quá trình binary search
git bisect start

# Đánh dấu phiên bản hiện tại là "bad"
git bisect bad

# Đánh dấu một version biết ổn định là "good"
git bisect good v1.2.0
```

- Git sẽ tự động checkout các commit trung gian để bạn kiểm tra.

## 9. Thêm hook tùy chỉnh cho quy trình CI/CD

```bash
# .git/hooks/pre-push (ví dụ)
#!/bin/sh
npm test || exit 1
```

- Đảm bảo mọi push đều chạy qua bộ test tự động trước khi đến remote.

## 10. Sử dụng `git submodule` để quản lý các repository phụ thuộc

```bash
# Thêm một submodule
git submodule add https://github.com/example/lib.git libs/lib

# Cập nhật tất cả submodule
git submodule update --remote
```

- Giúp duy trì đồng bộ các thư viện bên ngoài trong dự án lớn.

---

## Kết luận

Bằng việc nắm vững 10 thủ thuật Git nâng cao này, bạn sẽ làm việc hiệu quả hơn, giảm thiểu rủi ro mất mát dữ liệu và cải thiện quy trình phát triển phần mềm. Hãy áp dụng chúng ngay vào dự án của mình để cảm nhận sự khác biệt.

*Nguồn gốc: Bài viết gốc được sáng tác bởi **[Tên Tác Giả Gốc]** trên blog [Tên Blog/Giải Pháp].*