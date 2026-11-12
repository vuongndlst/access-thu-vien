"use strict";
window.LESSON = {
  id: "access-thu-vien-v1",
  title: "Tạo cơ sở dữ liệu thư viện",
  fields: {
    "NGƯỜI ĐỌC": [
      ["SoTheTV", "Short Text", "10", "PK"], ["HoVaTen", "Short Text", "50", ""],
      ["NgaySinh", "Date/Time", "—", ""], ["GioiTinh", "Short Text", "10", ""],
      ["DiaChi", "Short Text", "100", ""], ["DienThoai", "Short Text", "20", ""],
      ["Lop", "Short Text", "20", ""], ["Email", "Short Text", "50", ""]
    ],
    "SÁCH": [
      ["MaSach", "Short Text", "10", "PK"], ["TenSach", "Short Text", "100", ""],
      ["TacGia", "Short Text", "50", ""], ["NhaXuatBan", "Short Text", "50", ""],
      ["NamXuatBan", "Number", "Integer", ""], ["TheLoai", "Short Text", "50", ""],
      ["SoLuongTon", "Number", "Integer", ""]
    ],
    "MƯỢN_TRẢ": [
      ["MaMuonTra", "AutoNumber", "Tự sinh", "PK"], ["SoTheTV", "Short Text", "10", "FK"],
      ["MaSach", "Short Text", "10", "FK"], ["NgayMuon", "Date/Time", "—", ""],
      ["HanTra", "Date/Time", "—", ""], ["NgayTra", "Date/Time", "—", ""],
      ["TrangThai", "Short Text", "20", ""]
    ]
  },
  steps: [
    {id: "bang", title: "Bảng dữ liệu", short: "Bảng", kind: "stage", time: "5–7 phút", subtitle: "Nhìn một bảng, đọc được dữ liệu.", challenges: [
      {id: "explore", title: "Chọn trường và bản ghi", type: "demo"},
      {id: "t1", type: "single", title: "Một hàng đang nói về điều gì?", prompt: "Trong bảng SÁCH, hàng có MaSach = S002 chứa tên sách, tác giả và năm xuất bản. Hàng đó được gọi là gì?", options: ["Một bản ghi", "Một trường", "Một cơ sở dữ liệu", "Một kiểu dữ liệu"], answer: "Một bản ghi", hint: "Hàng này tập hợp các giá trị của một cuốn sách.", explanation: "Một hàng là một bản ghi. Mỗi cột là một trường, chẳng hạn TenSach."},
      {id: "t2", type: "match", title: "Ghép đúng khái niệm", prompt: "Chọn mô tả tương ứng với từng khái niệm.", items: [
        {label: "Trường (field)", options: ["Một cột lưu cùng loại thông tin", "Một hàng của bảng", "Tập hợp các bảng có liên quan"], answer: "Một cột lưu cùng loại thông tin"},
        {label: "Bản ghi (record)", options: ["Một cột lưu cùng loại thông tin", "Một hàng của bảng", "Tập hợp các bảng có liên quan"], answer: "Một hàng của bảng"},
        {label: "Cơ sở dữ liệu thư viện", options: ["Một cột lưu cùng loại thông tin", "Một hàng của bảng", "Tập hợp các bảng có liên quan"], answer: "Tập hợp các bảng có liên quan"}
      ], hint: "Thử đối chiếu từng khái niệm với bảng SÁCH vừa xem.", explanation: "Trường tương ứng với cột, bản ghi tương ứng với hàng. CSDL thư viện gồm các bảng về người đọc, sách và lượt mượn."},
      {id: "t3", type: "multi", title: "Chọn trường cho bảng SÁCH", prompt: "Chọn 2 trường mô tả sách.", options: ["TenSach", "Lop", "TacGia", "NgayMuon"], answer: ["TenSach", "TacGia"], hint: "Một trường ở bảng SÁCH mô tả đặc điểm của sách.", explanation: "TenSach và TacGia mô tả sách. Lop mô tả người đọc, còn NgayMuon mô tả lượt mượn."}
    ]},
    {id: "khoa-chinh", title: "Khóa chính và tạo bảng", short: "Khóa chính", kind: "stage", time: "8–10 phút", subtitle: "Mỗi bản ghi cần một mã để nhận diện.", challenges: [
      {id: "key-lab", title: "Tìm khóa chính phù hợp", type: "demo"},
      {id: "type-lab", title: "Thiết kế kiểu dữ liệu", type: "demo"},
      {id: "p1", type: "single", title: "Hai người trùng họ tên", prompt: "Bảng NGƯỜI ĐỌC có hai bạn cùng tên Nguyễn An nhưng số thẻ khác nhau. Vì sao HoVaTen chưa phù hợp làm khóa chính?", options: ["Họ tên có thể trùng giữa các bản ghi", "Họ tên có dấu tiếng Việt", "Họ tên có nhiều hơn một từ", "Họ tên được lưu dạng Short Text"], answer: "Họ tên có thể trùng giữa các bản ghi", hint: "Khóa chính phải phân biệt được từng hàng.", explanation: "Hai người có thể trùng họ tên. SoTheTV là lựa chọn phù hợp khi mỗi người có một số thẻ riêng, không trống."},
      {id: "p2", type: "select", title: "Giữ số 0 ở đầu", prompt: "Chọn kiểu dữ liệu phù hợp cho từng trường.", items: [
        {label: "DienThoai, ví dụ 0912345678", options: ["Short Text", "Number", "Date/Time"], answer: "Short Text"},
        {label: "NgaySinh", options: ["Short Text", "Number", "Date/Time"], answer: "Date/Time"}
      ], hint: "Số điện thoại là thông tin liên hệ. Em có cần cộng hoặc trừ các số điện thoại không?", explanation: "DienThoai dùng Short Text để giữ các chữ số đầu và cách viết. NgaySinh dùng Date/Time để lưu ngày."},
      {id: "p3", type: "order", title: "Sắp xếp cách tạo bảng", prompt: "Đưa các bước theo thứ tự thực hiện trong bài này. Kéo thả hoặc dùng nút lên, xuống.", items: [
        {id: "save", text: "Lưu bảng với đúng tên"}, {id: "fields", text: "Khai báo Field Name, Data Type, Field Size"},
        {id: "database", text: "Tạo Blank database và lưu ThuVien.accdb"}, {id: "pk", text: "Chọn trường và bấm Primary Key"},
        {id: "design", text: "Mở Create → Table Design"}
      ], answer: ["database", "design", "fields", "pk", "save"], hint: "Cần có tệp CSDL trước khi tạo bảng. Khai báo trường trước khi chọn trường làm khóa chính.", explanation: "Tạo tệp → Table Design → khai báo trường và thuộc tính → đặt khóa chính → lưu bảng."}
    ]},
    {id: "lien-ket", title: "Khóa ngoại và Relationships", short: "Liên kết", kind: "stage", time: "8–10 phút", subtitle: "Nối đúng mã để dữ liệu đi cùng nhau.", challenges: [
      {id: "relationship-lab", title: "Nối hai cặp trường", type: "demo"},
      {id: "integrity-lab", title: "Thử một mã hợp lệ và một mã sai", type: "demo"},
      {id: "f1", type: "match", title: "Mỗi mã tham chiếu đến đâu?", prompt: "Trong bảng MƯỢN_TRẢ, chọn trường được tham chiếu bởi từng khóa ngoại.", items: [
        {label: "MƯỢN_TRẢ.SoTheTV", options: ["NGƯỜI ĐỌC.SoTheTV", "SÁCH.MaSach", "MƯỢN_TRẢ.MaMuonTra"], answer: "NGƯỜI ĐỌC.SoTheTV"},
        {label: "MƯỢN_TRẢ.MaSach", options: ["NGƯỜI ĐỌC.SoTheTV", "SÁCH.MaSach", "MƯỢN_TRẢ.MaMuonTra"], answer: "SÁCH.MaSach"}
      ], hint: "Mã thẻ giúp tìm người đọc, mã sách giúp tìm sách.", explanation: "SoTheTV ở MƯỢN_TRẢ tham chiếu SoTheTV ở NGƯỜI ĐỌC. MaSach ở MƯỢN_TRẢ tham chiếu MaSach ở SÁCH."},
      {id: "f2", type: "single", title: "Một người mượn nhiều lần", prompt: "TV001 xuất hiện trong ba lượt mượn khác nhau. SoTheTV ở MƯỢN_TRẢ là khóa ngoại. Việc lặp mã này có phù hợp không?", options: ["Có, một người có thể có nhiều lượt mượn", "Không, mọi trường chứa mã đều phải duy nhất", "Không, mỗi người chỉ được có một bản ghi mượn", "Có, vì khóa ngoại tự sinh số mới"], answer: "Có, một người có thể có nhiều lượt mượn", hint: "Mỗi lượt mượn có MaMuonTra riêng. SoTheTV cho biết ai thực hiện lượt mượn đó.", explanation: "Khóa ngoại có thể lặp. Quan hệ một–nhiều cho phép một người đọc liên quan đến nhiều lượt mượn."},
      {id: "f3", type: "truefalse", title: "Access có cho lưu không?", prompt: "Đã bật Enforce Referential Integrity. Có thể lưu một lượt mượn với MaSach = S999 dù mã này chưa có ở SÁCH.", answer: "Sai", hint: "Hãy nhớ kết quả thử mã S999 trong phần tương tác.", explanation: "Access từ chối lưu mã tham chiếu chưa tồn tại. Cần sửa sang mã đã có hoặc thêm sách tương ứng trước."}
    ]},
    {id: "boss", title: "Boss · Người giữ thư viện", short: "Boss cuối", kind: "boss", subtitle: "Vận dụng những gì em vừa học.", challenges: [
      {id: "b1", type: "single", title: "Đọc cấu trúc bảng", prompt: "Một bảng có 7 cột và 10 hàng dữ liệu, không tính hàng tiêu đề. Bảng đó có bao nhiêu bản ghi?", options: ["10 bản ghi", "7 bản ghi", "17 bản ghi", "70 bản ghi"], answer: "10 bản ghi", hint: "Mỗi hàng dữ liệu tương ứng với một bản ghi.", explanation: "Bảng có 10 hàng dữ liệu nên có 10 bản ghi. Bảy cột là bảy trường."},
      {id: "b2", type: "multi", title: "Bảo vệ khóa chính", prompt: "Một trường được chọn làm khóa chính. Chọn 2 điều kiện dữ liệu phải đáp ứng.", options: ["Giá trị không trùng giữa các bản ghi", "Mỗi giá trị phải là số", "Giá trị không được trống", "Mọi giá trị phải tăng liên tục"], answer: ["Giá trị không trùng giữa các bản ghi", "Giá trị không được trống"], hint: "Khóa chính phải nhận diện được một bản ghi cụ thể.", explanation: "Khóa chính phải duy nhất và không trống. Khóa chính có thể là văn bản, chẳng hạn mã TV001."},
      {id: "b3", type: "select", title: "Hoàn thiện thiết kế MƯỢN_TRẢ", prompt: "Điền lựa chọn đúng cho hai trường sau.", items: [
        {label: "MaMuonTra dùng kiểu", options: ["AutoNumber", "Short Text", "Date/Time"], answer: "AutoNumber"},
        {label: "SoTheTV dùng kiểu và kích thước", options: ["Short Text, 10", "Number, Integer", "Short Text, 100"], answer: "Short Text, 10"}
      ], hint: "MaMuonTra là mã tự sinh của lượt mượn. SoTheTV nối tới trường cùng tên ở NGƯỜI ĐỌC.", explanation: "Theo thiết kế đề bài, MaMuonTra dùng AutoNumber. Hai trường SoTheTV đều dùng Short Text kích thước 10."},
      {id: "b4", type: "match", title: "Đặt đầu 1 và đầu nhiều", prompt: "Chọn vai trò của từng trường trong quan hệ NGƯỜI ĐỌC → MƯỢN_TRẢ.", items: [
        {label: "NGƯỜI ĐỌC.SoTheTV", options: ["Khóa chính, đầu 1", "Khóa ngoại, đầu ∞"], answer: "Khóa chính, đầu 1"},
        {label: "MƯỢN_TRẢ.SoTheTV", options: ["Khóa chính, đầu 1", "Khóa ngoại, đầu ∞"], answer: "Khóa ngoại, đầu ∞"}
      ], hint: "Một thẻ chỉ có một người đọc trong bảng người đọc, nhưng xuất hiện được ở nhiều lượt mượn.", explanation: "Khóa chính ở bảng người đọc thuộc đầu 1. Khóa ngoại ở bảng mượn trả thuộc đầu nhiều."},
      {id: "b5", type: "order", title: "Thiết lập quan hệ có ràng buộc", prompt: "Các bảng đã tạo và đã đóng tab. Sắp xếp các thao tác sau.", items: [
        {id: "create", text: "Bấm Create trong hộp thoại Edit Relationships"},
        {id: "enforce", text: "Kiểm tra cặp trường và tích Enforce Referential Integrity"},
        {id: "tables", text: "Mở Database Tools → Relationships và thêm ba bảng"},
        {id: "verify", text: "Kiểm tra đường nối hiện 1–∞ và lưu sơ đồ"},
        {id: "drag", text: "Kéo khóa chính vào khóa ngoại tương ứng"}
      ], answer: ["tables", "drag", "enforce", "create", "verify"], hint: "Cần thấy bảng trong sơ đồ trước khi kéo. Tích ràng buộc trong hộp thoại trước khi bấm Create.", explanation: "Thêm bảng → nối đúng cặp trường → bật ràng buộc → Create → kiểm tra và lưu."},
      {id: "b6", type: "truefalse", title: "Sửa lỗi tham chiếu", prompt: "Khi Access từ chối lưu TV888 vì chưa có người đọc mang mã đó, em có thể sửa sang một số thẻ đã tồn tại rồi lưu lại.", answer: "Đúng", hint: "Một lượt mượn hợp lệ phải tham chiếu được đến người đọc tương ứng.", explanation: "Sửa về số thẻ có thật trong NGƯỜI ĐỌC giúp khôi phục tham chiếu hợp lệ. Hãy chọn đúng người thực sự mượn."},
      {id: "g1", advanced: true, type: "multi", title: "Vàng · Xóa người đọc đang có lượt mượn", prompt: "Đã bật toàn vẹn tham chiếu và đang tắt Cascade Delete Related Records. TV001 có lượt mượn. Chọn 2 nhận định đúng.", options: ["Access chặn việc xóa người đọc TV001", "Các lượt mượn tự mất khi xóa TV001", "Cần xử lý các bản ghi tham chiếu trước khi xóa", "Đổi tên người đọc luôn làm mất liên kết"], answer: ["Access chặn việc xóa người đọc TV001", "Cần xử lý các bản ghi tham chiếu trước khi xóa"], hint: "Sau khi xóa người đọc, các lượt mượn còn lại sẽ trỏ đến ai?", explanation: "Khi không bật xóa dây chuyền, Access chặn việc xóa bản ghi cha đang được tham chiếu. Các bản ghi liên quan cần được xử lý phù hợp trước."},
      {id: "g2", advanced: true, type: "single", title: "Vàng · Hai lần mượn cùng một sách", prompt: "TV002 mượn S003 vào hai ngày khác nhau. Vì sao riêng cặp SoTheTV và MaSach chưa đủ nhận diện từng lượt trong thiết kế này?", options: ["Cùng một cặp mã có thể xuất hiện ở nhiều lượt", "Khóa ngoại không được có kiểu Short Text", "Mỗi sách chỉ xuất hiện được ở một lượt", "Các trường mã không thể đặt cạnh nhau"], answer: "Cùng một cặp mã có thể xuất hiện ở nhiều lượt", hint: "So sánh hai hàng khi cùng người đọc mượn lại cùng cuốn sách.", explanation: "Hai lượt có cùng người và sách vẫn là hai sự kiện khác nhau. MaMuonTra giúp nhận diện riêng từng lượt."}
    ]}
  ],
  media: {
    tables: {id: "e06FnSV9INw", title: "Access: Working with Tables", summary: "Quan sát hàng, cột và cách nhập dữ liệu trong Datasheet View.", source: "https://www.learnfree.org/series/access-foundations"},
    design: {id: "mtX2QLrJv1U", title: "Access: Modifying Tables", summary: "Quan sát cách thay đổi trường và thuộc tính của bảng.", source: "https://www.learnfree.org/series/access-foundations"},
    relations: {id: "DlGEECPru3E", title: "Access 2007: Building Table Relationships", summary: "Kéo trường khóa, kiểm tra cặp trường và bật Enforce Referential Integrity. Đầu 1 thuộc bảng cha, đầu nhiều thuộc bảng chứa khóa ngoại.", source: "https://www.youtube.com/watch?v=DlGEECPru3E"}
  }
};
