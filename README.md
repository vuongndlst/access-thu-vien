# Thư viện dữ liệu · Microsoft Access lớp 11

Web tự học của Trường THCS và THPT Đinh Thiện Lý.

- Bài 01: `index.html` — bảng, khóa chính, khóa ngoại và quan hệ.
- Bài 02: `forms.html` — Form, Record Source, Form Wizard, thêm và sửa lượt mượn.
- Yêu cầu thực hành: `bai02-form-canvas.html`.

Mỗi bài có ba chặng, phần tự thử, checkpoint nhiều dạng và Boss cuối. Chứng chỉ Bạc mở khi hoàn thành toàn bộ nhiệm vụ bắt buộc; hai câu mở rộng nâng lên Vàng. Đảo 3D và bài đọc dùng chung tiến độ. Mỗi trạm có trò chơi tùy chọn tối đa 30 giây; chơi không cấp tín chỉ học tập.

Ảnh PNG chụp trực tiếp từ Access ở 1920×1080, cắt giữ nguyên điểm ảnh. Video Form quay trực tiếp ở 1080p/30 fps, dài 3 phút 34 giây, có vòng sáng, tooltip và chú thích tiếng Việt, không có lời đọc. Các trình phát hiện sẵn trong bài.

Hồ sơ và tiến độ lưu trong trình duyệt của máy học. Hai bài dùng chung hồ sơ nhưng có tiến độ và chứng chỉ riêng. Phiên bản tĩnh chưa đồng bộ nhiều thiết bị hoặc tổng hợp điểm của lớp. Điểm thực hành chính thức quản lý trên Canvas.

## Chạy trên máy

Phục vụ thư mục này bằng HTTP, ví dụ `python -m http.server 8876`. Mở `http://localhost:8876`. Đảo dùng JavaScript modules nên cần HTTP hoặc HTTPS.

## Chỉnh nội dung

`data.js`, `forms-data.js` chứa câu hỏi và gợi ý; `app.js` quản lý hồ sơ, tiến độ và chứng chỉ; `forms-lesson.js` chứa hoạt động Form; `progress.js` dùng một quy tắc hoàn thành cho khóa chặng, Boss và chứng chỉ. `world-bridge.js` nối với đảo tại `assets/island`. Giao diện trong `style.css`.

Giữ mã bài và câu hỏi khi sửa câu chữ để bảo toàn tiến độ. Đây là học liệu tự học, đáp án nằm trong JavaScript phía trình duyệt. Các mô phỏng không thay thế thực hành trong Access.

Nguồn và giấy phép ở [SOURCES.md](SOURCES.md), [SOURCES_Forms.md](SOURCES_Forms.md). Font, Three.js và mô hình được phục vụ từ tệp nội bộ. Video LearnFree nhúng chính thức; không lưu bản sao YouTube.
