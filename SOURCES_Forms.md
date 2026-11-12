# Nguồn bài 2 · Biểu mẫu mượn sách trong Access

Đối chiếu ngày 13/11/2026, múi giờ Việt Nam. Tài nguyên này hỗ trợ bài tiếp theo của CSDL thư viện, dùng biểu mẫu gắn với bảng `MƯỢN_TRẢ`.

## Video LearnFree chính thức

Đã kiểm tra YouTube oEmbed ngày 13/11/2026. Cả hai trả HTTP 200, `author_name` là `LearnFree`, `author_url` là `https://www.youtube.com/@Learnfree_skills`, và `type` là `video`.

| Video | ID | Vai trò trong bài | URL chính thức |
|---|---|---|---|
| Access: Creating Forms | `dEaQIrw3CZY` | Quan sát cách tạo biểu mẫu từ dữ liệu đang có và chỉnh bố cục | [Xem trên kênh LearnFree](https://www.youtube.com/watch?v=dEaQIrw3CZY) |
| Access: Working with Forms | `uTRdmSQjjm8` | Quan sát cách mở biểu mẫu, xem và nhập dữ liệu qua các điều khiển | [Xem trên kênh LearnFree](https://www.youtube.com/watch?v=uTRdmSQjjm8) |

Nhúng bằng trình phát YouTube chính thức. Ví dụ `https://www.youtube-nocookie.com/embed/dEaQIrw3CZY`. Video giữ tiếng Anh và có thể bật phụ đề do YouTube cung cấp. Hai video là tài nguyên bổ trợ về Form. Cấu hình Combo Box lưu mã–hiện tên của bài thư viện được đối chiếu riêng với Microsoft Support dưới đây. Không tải bản sao video YouTube vào dự án.

## Tạo biểu mẫu gắn với bảng

Form cho phép xem, thêm và sửa dữ liệu được lưu trong bảng hoặc truy vấn nguồn. Có thể chọn bảng trong Navigation Pane rồi chọn **Create → Form**, hoặc dùng **Create → Form Wizard** để chọn các trường. Đối với bài này, nguồn dữ liệu của Form là `MƯỢN_TRẢ`. [Microsoft Support — Create a form in Access](https://support.microsoft.com/en-us/access/create-a-form-in-access), [Create a form by using the Form Wizard](https://support.microsoft.com/en-us/access/create-a-form-by-using-the-form-wizard)

Mở Property Sheet bằng **F4**, chọn đối tượng Form rồi kiểm tra **Data → Record Source**. Với điều khiển nhập dữ liệu, **Control Source** xác định trường nhận giá trị. Khi dùng Combo Box Wizard, lựa chọn **Store that value in this field** liên kết giá trị đã chọn với trường lưu trữ. [Microsoft Support — Add a list box or combo box](https://support.microsoft.com/en-us/access/add-a-list-box-or-combo-box)

## Combo Box lưu mã và hiển thị tên

**Bound Column** quy định cột lấy giá trị để lưu. Cột hiển thị ở phần ô nhập của Combo Box là cột đầu tiên có độ rộng khác 0. Vì vậy có thể ẩn cột mã nhưng vẫn chọn cột mã làm cột lưu trữ. Số thứ tự của Bound Column bắt đầu từ 1. [Microsoft Support — BoundColumn Property](https://support.microsoft.com/en-us/access/boundcolumn-property)

Cấu hình dưới đây áp dụng vào mô hình thư viện đang dùng.

| Thuộc tính | Chọn người đọc | Chọn sách |
|---|---|---|
| Name | `cboNguoiDoc` | `cboSach` |
| Control Source | `SoTheTV` | `MaSach` |
| Row Source Type | `Table/Query` | `Table/Query` |
| Column Count | `2` | `2` |
| Bound Column | `1` | `1` |
| Column Widths | `0cm;6cm` | `0cm;6cm` |
| Limit To List | `Yes` | `Yes` |

Row Source cho `cboNguoiDoc`.

```sql
SELECT [SoTheTV], [HoVaTen]
FROM [NGƯỜI ĐỌC]
ORDER BY [HoVaTen];
```

Row Source cho `cboSach`.

```sql
SELECT [MaSach], [TenSach]
FROM [SÁCH]
ORDER BY [TenSach];
```

Ví dụ kiểm chứng khi quay bài thực hành. Chọn một họ tên trên Form, lưu lượt mượn rồi mở `MƯỢN_TRẢ` để xem `SoTheTV` nhận đúng mã tương ứng. Làm tương tự với tên sách và `MaSach`. Các truy vấn trên chỉ cung cấp danh sách lựa chọn, còn bản ghi lượt mượn được ghi vào nguồn dữ liệu của Form.

## Cấu trúc dữ liệu giữ nguyên

| Trường trong MƯỢN_TRẢ | Kiểu dữ liệu |
|---|---|
| `MaMuonTra` | AutoNumber, khóa chính |
| `SoTheTV` | Short Text, Field Size 10, khóa ngoại |
| `MaSach` | Short Text, Field Size 10, khóa ngoại |
| `NgayMuon` | Date/Time |
| `HanTra` | Date/Time |
| `NgayTra` | Date/Time |
| `TrangThai` | Short Text, Field Size 20 |

`MaMuonTra` do Access sinh. Với lượt đang mượn, `NgayTra` để trống. Các mã trong hai Combo Box lấy từ bảng danh mục hiện có. Ảnh và video thao tác tại máy giáo viên cần được quay từ tệp thư viện thực tế, sau đó kiểm tra độ phân giải 1920×1080 trên tệp xuất.
