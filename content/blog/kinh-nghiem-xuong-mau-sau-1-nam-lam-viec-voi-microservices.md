---
title: "Kinh nghiệm xương máu sau 1 năm làm việc với Microservices"
excerpt: "Những bài học thực tiễn về giao tiếp, logging và quản lý dữ liệu khi làm việc với kiến trúc microservices."
date: "2025-12-03"
tags: []
cover: "/showcases/microservices-architecture.png"
---

## Mở đầu – Tại sao tôi rời bỏ monolith?

Khi còn là một lập trình viên backend mới vào công ty, mọi người đều nói về “độ linh hoạt” và “khả năng mở rộng vô hạn” của **microservices**. Đó là những lời hứa khiến tôi quyết định đưa dự án lớn nhất của mình – một hệ thống thương mại điện tử monolith 2 triệu dòng code – sang kiến trúc microservices.

Ban đầu, tôi kỳ vọng:

- Deploy nhanh hơn, chỉ cần thay đổi một service mà không ảnh hưởng tới toàn bộ hệ thống.  
- Đội ngũ có thể làm việc độc lập, mỗi người chịu trách nhiệm cho một domain riêng.  
- Khả năng scale theo nhu cầu thực tế (CPU, memory) của từng service.

Nhưng sau một năm “đấu tranh” với hàng chục service, tôi đã học được những bài học đắt giá mà không có cuốn sách nào dạy trước. Dưới đây là ba điều quan trọng nhất – và một vài lời khuyên cho các bạn đang chuẩn bị bước vào con đường này.

![](Mô tả hình ảnh về kiến trúc microservices phức tạp nhưng có trật tự)

## Bài học 1: Communication is King – Giao tiếp giữa các service không hề đơn giản

### 1.1. Đừng để RPC trở thành “điện thoại cũ”

Trong monolith, một hàm gọi trực tiếp là đủ. Khi chuyển sang microservices, mỗi lời gọi đều phải qua mạng (HTTP/gRPC/Kafka). Điều này mang lại:

- **Latency**: Một chuỗi 5 service có thể mất tới vài trăm milisecond – đủ để người dùng cảm thấy chậm.
- **Fault tolerance**: Mạng không ổn định → timeout, circuit‑breaker cần thiết.

### 1.2. Đặt API contract nghiêm ngặt

Sử dụng OpenAPI/ProtoBuf để mô tả rõ ràng request/response. Khi contract thay đổi, CI/CD pipeline của bạn phải kiểm tra tương thích tự động, tránh “breaking change” gây cascade failure.

### 1.3. Hãy cân nhắc event‑driven

Đối với các tác vụ không cần trả lời ngay (ví dụ: gửi email, cập nhật analytics), hãy dùng message broker (Kafka, RabbitMQ). Điều này giảm độ phụ thuộc đồng thời và giúp hệ thống chịu tải tốt hơn.

![](Mô tả hình ảnh so sánh Monolith vs Microservices)

## Bài học 2: Distributed Logging & Tracing – Không có chúng, bạn như người mù

### 2.1. Log tập trung là bắt buộc

Mỗi service ghi log riêng vào stdout, nhưng khi lỗi xảy ra, việc “đi tìm” log trong 20 container khác là cực kỳ mất thời gian. Sử dụng **ELK** (Elasticsearch‑Logstash‑Kibana) hoặc **EFK** (Fluentd thay Logstash) để tập trung logs và cho phép truy vấn qua correlation ID.

### 2.2. Tracing giúp “xem xuyên” hành trình request

OpenTelemetry + Jaeger hay Zipkin cho phép bạn:

- Xác định service nào gây bottleneck.
- Theo dõi thời gian mỗi hop trong chuỗi gọi.
- Phát hiện lỗi timeout ngay từ đầu.

### 2.3. Đừng quên chuẩn hoá metadata

Mỗi log/tracing span nên có các trường chung: `trace_id`, `span_id`, `service_name`, `environment`. Khi mọi thứ đồng nhất, dashboard monitoring sẽ trở nên mạnh mẽ hơn rất nhiều.

![](Mô tả hình ảnh screenshot Grafana/Datadog hiển thị metrics và traces)

## Bài học 3: Database per Service – Cái giá của sự độc lập

### 3.1. Độc lập không đồng nghĩa với “đứt rời”

Mỗi service có DB riêng giúp tránh lock toàn hệ thống, nhưng đồng thời tạo ra **data consistency** khó khăn. Khi một transaction cần cập nhật ở nhiều service, bạn sẽ phải:

- Áp dụng saga pattern (choreography hoặc orchestration).  
- Đảm bảo idempotency cho các bước.

### 3.2. Đừng để “duplicate data” bùng nổ

Thường xuyên xuất hiện trường hợp lưu trữ cùng dữ liệu ở nhiều service (user profile, address). Điều này làm tăng chi phí sync và gây lỗi đồng bộ. Hãy xác định rõ ràng **ownership** của mỗi bảng.

### 3.3. Giám sát query performance từng DB

Mỗi database cần có metrics riêng: QPS, latency, slow‑query logs. Khi một service gặp vấn đề về DB, bạn sẽ nhanh chóng biết được mà không phải dò tìm trong toàn hệ thống.

## Kết luận – Microservices có phải là “viên đạn bạc”?

Microservices không phải là giải pháp “mọi chuyện”. Chúng mang lại **linh hoạt** và **khả năng mở rộng**, nhưng đồng thời yêu cầu:

- Kiến trúc giao tiếp rõ ràng, fallback cơ chế.  
- Hệ thống logging & tracing mạnh mẽ để “đánh sáng” các lỗi phân tán.  
- Quản lý dữ liệu cẩn thận, tránh “data chaos”.

Nếu bạn còn đang cân nhắc chuyển đổi, hãy bắt đầu **với một vài service** thay vì toàn bộ hệ thống. Đặt mục tiêu rõ ràng, đo lường từng bước và luôn nhớ rằng **độ phức tạp tăng lên cùng với lợi ích**.

> **Lời khuyên cuối cùng:** Đừng để “micro” làm mất đi “service”. Hãy giữ cho kiến trúc sạch, tài liệu đầy đủ và luôn chuẩn bị sẵn sàng cho việc debug trong môi trường phân tán. Chúc các bạn thành công trên hành trình microservices!