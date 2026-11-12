# Nguồn học liệu và thư viện

Đối chiếu ngày 11/11/2026. Website phục vụ bài học CSDL thư viện lớp 11 tại Trường THCS và THPT Đinh Thiện Lý.

## Video LearnFree

Cả ba video đã được xác minh bằng endpoint YouTube oEmbed, trả HTTP 200, tên tác giả `LearnFree` và kênh `https://www.youtube.com/@Learnfree_skills`. Website dùng trình phát nhúng chính thức, không lưu bản sao video.

| Video | Nội dung dùng trong bài | Nguồn |
|---|---|---|
| Access — Working with Tables | Trường, bản ghi và nhập dữ liệu | [YouTube](https://www.youtube.com/watch?v=e06FnSV9INw) |
| Access — Modifying Tables | Kiểu dữ liệu, thuộc tính và độ dài trường | [YouTube](https://www.youtube.com/watch?v=mtX2QLrJv1U) |
| Access 2007 — Building Table Relationships | Nối trường, khóa ngoại và toàn vẹn tham chiếu | [YouTube](https://www.youtube.com/watch?v=DlGEECPru3E), [bài nguồn](https://edu.gcfglobal.org/en/access2007/building-table-relationships/1/) |

Video quan hệ sử dụng giao diện **Access 2007**. Website ghi nhãn phiên bản ở cạnh trình phát. Phần hướng dẫn và ảnh trong bài dùng giao diện Access hiện có trên máy giáo viên. Một số URL bài GCFGlobal cũ đã chuyển sang LearnFree và trả 404. Trang khóa hiện hành [Access Foundations](https://www.learnfree.org/series/access-foundations) còn truy cập được tại thời điểm đối chiếu.

## Ảnh và dữ liệu

Ảnh thao tác được chụp trực tiếp từ Microsoft Access ở 1920×1080, từ `_planning/access-capture-20261111/` và `_planning/form-captures/`. Bản toàn cửa sổ công khai được cắt còn 1904×955 để bỏ đường dẫn cá nhân và thanh tác vụ. Ảnh cận cảnh giữ nguyên điểm ảnh, không nội suy. Các ảnh WebP cũ đã được thay bằng PNG. Dữ liệu người đọc, sách và lượt mượn là dữ liệu giả lập phục vụ học tập.

Ảnh LearnFree cũ tại `media.gcflearnfree.org` không được tải vào dự án vì domain không phân giải DNS và chưa xác minh được kích thước gốc.

## Boss và giao diện tham chiếu

Luồng nhập thông tin, khóa chặng và Boss tham chiếu bộ C++ V3 của thầy tại `Grade 8/03. Lap trinh C++ V3/Web/`. Mã Boss được tái dùng từ `Web/runtime/cpp/engine/boss3d.js`, với câu hỏi và ngữ cảnh thay bằng bài Access.

## Thư viện ngoại tuyến

- **Three.js 0.160.0** tải nguyên bản từ [jsDelivr](https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js). Giấy phép MIT được lưu tại `dist/assets/vendor/LICENSE-three.txt`. [Nguồn giấy phép](https://cdn.jsdelivr.net/npm/three@0.160.0/LICENSE)
- **Source Sans 3**, trục độ đậm 400–700, và **Bricolage Grotesque**, trục độ đậm 600–750, tải từ [Google Fonts](https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400..700&family=Bricolage+Grotesque:wght@600..750&display=swap). Mỗi font lưu hai subset Vietnamese và Latin dưới dạng WOFF2 trong `dist/assets/fonts/`, được khai báo bằng URL nội bộ trong `fonts.css`. Cả hai dùng SIL Open Font License 1.1, bản giấy phép được giữ cùng font. [Source Sans 3 OFL](https://github.com/google/fonts/blob/main/ofl/sourcesans3/OFL.txt), [Bricolage Grotesque OFL](https://github.com/google/fonts/blob/main/ofl/bricolagegrotesque/OFL.txt)

Font và Three.js chạy từ tệp nội bộ. Video nhúng cần kết nối Internet.

## Cập nhật hình ảnh và đảo 3D, 13/11/2026

Thay toàn bộ ảnh cũ bằng 12 ảnh chi tiết PNG và 12 ảnh toàn cửa sổ, từ bản chụp desktop Access 1920 × 1080 ngày 11/11/2026 tại `_planning/access-capture-20261111`. Vùng chi tiết được cắt giữ nguyên điểm ảnh, không kéo giãn hoặc tăng độ phân giải. Các bản công khai cắt thanh tiêu đề và thanh tác vụ. Bài Form bổ sung 7 cặp ảnh tương tự, chụp ngày 13/11/2026.

Đảo dùng các mô-đun quest3d và station-arcade cùng các mô hình của bộ C++ V3 tại `Grade 8/03. Lap trinh C++ V3/Web/runtime/ml/assets`. Dùng giao diện archive cho thư viện. Three.js 0.160.0 và các helper nạp từ tệp nội bộ. Các mô hình lsts-runner, lsts-plane và archive-landmark được tái sử dụng trong phạm vi học liệu của giáo viên. Luồng và luật trò chơi giữ nguồn C++ V3, tiến độ học tập nối qua adapter riêng.

Video Form được quay trực tiếp từ Access ở 1920 × 1080, 30 fps, H.264. Vòng sáng, tooltip và chữ hướng dẫn được thêm vào đúng mốc thao tác của bản quay thật. Không dùng ảnh ghép thay cho video thao tác. Video dài 213,53 giây, không có lời đọc. Hai video LearnFree mới và tài liệu Form có trong `SOURCES_Forms.md`.
