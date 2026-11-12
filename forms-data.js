"use strict";
window.LESSON = {
  "id": "access-form-v1",
  "revision": "three-forms-20261113",
  "kind": "forms",
  "page": "forms.html",
  "worldPage": "world-forms.html",
  "title": "Ba Form quản lý thư viện",
  "island": "Đảo Form thư viện",
  "symbols": [
    "FORM",
    "CODE",
    "LIST",
    "SAVE"
  ],
  "certificateTopics": "Người đọc · Sách · Mượn trả · Combo Box · Nút lệnh",
  "steps": [
    {
      "id": "hieu-form",
      "title": "Ba Form, ba nguồn dữ liệu",
      "short": "Hiểu ba Form",
      "time": "7–10 phút",
      "kind": "stage",
      "subtitle": "Phân biệt mã tự sinh, mã danh mục và các ô lựa chọn.",
      "challenges": [
        {
          "id": "explore-forms-v2",
          "type": "demo",
          "title": "Quan sát đủ ba Form và dữ liệu được lưu"
        },
        {
          "id": "v2-t1",
          "type": "match",
          "title": "Form nào dùng bảng nào?",
          "prompt": "Ghép từng Form với nguồn bản ghi phù hợp.",
          "items": [
            {
              "label": "F_NguoiDoc",
              "options": [
                "NGƯỜI ĐỌC",
                "SÁCH",
                "MƯỢN_TRẢ"
              ],
              "answer": "NGƯỜI ĐỌC"
            },
            {
              "label": "F_Sach",
              "options": [
                "NGƯỜI ĐỌC",
                "SÁCH",
                "MƯỢN_TRẢ"
              ],
              "answer": "SÁCH"
            },
            {
              "label": "F_MuonTra",
              "options": [
                "NGƯỜI ĐỌC",
                "SÁCH",
                "MƯỢN_TRẢ"
              ],
              "answer": "MƯỢN_TRẢ"
            }
          ],
          "hint": "Mỗi Form phục vụ một nhóm bản ghi.",
          "explanation": "F_NguoiDoc dùng NGƯỜI ĐỌC; F_Sach dùng SÁCH; F_MuonTra dùng MƯỢN_TRẢ."
        },
        {
          "id": "v2-t2",
          "type": "truefalse",
          "title": "Mã mượn trả có nhập tay không?",
          "prompt": "Khi thêm lượt mượn trong F_MuonTra, em tự điền MaMuonTra để mã tăng liên tục.",
          "answer": "Sai",
          "hint": "Nhớ kiểu dữ liệu đã chọn cho MaMuonTra ở bài trước.",
          "explanation": "MaMuonTra là AutoNumber, do Access tự sinh. Người dùng không nhập hoặc sửa giá trị này; mã có thể có khoảng trống."
        },
        {
          "id": "v2-t3",
          "type": "single",
          "title": "Chọn tên, lưu giá trị nào?",
          "prompt": "Trong F_MuonTra, em chọn tên một người đọc từ Combo Box. Trường SoTheTV nhận giá trị nào?",
          "options": [
            "Mã thẻ của người được chọn",
            "Họ tên của người được chọn",
            "Vị trí dòng trong danh sách",
            "Mã mượn trả đang hiển thị"
          ],
          "answer": "Mã thẻ của người được chọn",
          "hint": "Tên giúp chọn đúng người; khóa ngoại vẫn phải khớp bảng danh mục.",
          "explanation": "Combo Box hiển thị tên nhưng lưu số thẻ. Không chép họ tên vào trường SoTheTV."
        }
      ]
    },
    {
      "id": "tao-form",
      "title": "Thiết kế ba Form dùng được",
      "short": "Thiết kế Form",
      "time": "12–18 phút",
      "kind": "stage",
      "subtitle": "Tạo Form, cấu hình Combo Box và gắn nút lệnh.",
      "challenges": [
        {
          "id": "config-reader-v2",
          "type": "demo",
          "title": "Cấu hình F_NguoiDoc"
        },
        {
          "id": "config-book-v2",
          "type": "demo",
          "title": "Cấu hình F_Sach"
        },
        {
          "id": "config-loan-v2",
          "type": "demo",
          "title": "Cấu hình F_MuonTra"
        },
        {
          "id": "buttons-v2",
          "type": "demo",
          "title": "Ghép thao tác cho năm nút lệnh"
        },
        {
          "id": "v2-p1",
          "type": "select",
          "title": "Hai nguồn của Combo Box",
          "prompt": "Combo Box chọn sách có Row Source gồm MaSach, TenSach theo thứ tự này. Hoàn thiện cấu hình.",
          "items": [
            {
              "label": "Control Source",
              "options": [
                "MaSach",
                "TenSach",
                "SoTheTV"
              ],
              "answer": "MaSach"
            },
            {
              "label": "Bound Column",
              "options": [
                "1",
                "2",
                "0"
              ],
              "answer": "1"
            },
            {
              "label": "Column Widths",
              "options": [
                "0cm;6cm",
                "6cm;0cm",
                "0cm;0cm"
              ],
              "answer": "0cm;6cm"
            }
          ],
          "hint": "Phân biệt trường nhận dữ liệu, cột trả giá trị và cột được nhìn thấy.",
          "explanation": "Control Source = MaSach; Bound Column = 1 lấy cột mã; ẩn cột đầu để ô hiển thị tên sách."
        },
        {
          "id": "v2-p2",
          "type": "single",
          "title": "Nút Lưu lưu điều gì?",
          "prompt": "Nút Lưu trong Form nhập liệu nên gắn với hành động nào của Command Button Wizard?",
          "options": [
            "Record Operations → Save Record",
            "Form Operations → Close Form",
            "Record Operations → Add New Record",
            "Record Navigation → Next Record"
          ],
          "answer": "Record Operations → Save Record",
          "hint": "Mục tiêu là ghi các thay đổi của bản ghi hiện tại.",
          "explanation": "Save Record lưu dữ liệu đang nhập. Lưu thiết kế Form là một thao tác khác."
        },
        {
          "id": "v2-p3",
          "type": "order",
          "title": "Từ bảng đến Form hoàn chỉnh",
          "prompt": "Sắp xếp các nhóm việc theo thứ tự hợp lý.",
          "items": [
            {
              "id": "test",
              "text": "Lưu thiết kế, mở Form View và kiểm tra"
            },
            {
              "id": "buttons",
              "text": "Thêm các nút lệnh phù hợp"
            },
            {
              "id": "controls",
              "text": "Cấu hình ô nhập, AutoNumber và dropdown"
            },
            {
              "id": "wizard",
              "text": "Tạo Form Wizard từ bảng tương ứng"
            }
          ],
          "answer": [
            "wizard",
            "controls",
            "buttons",
            "test"
          ],
          "hint": "Cần có Form trước khi cấu hình điều khiển và kiểm thử.",
          "explanation": "Tạo Form → cấu hình điều khiển → gắn nút → lưu và thử bằng dữ liệu."
        }
      ]
    },
    {
      "id": "dung-form",
      "title": "Vận hành quầy mượn sách",
      "short": "Dùng ba Form",
      "time": "10–15 phút",
      "kind": "stage",
      "subtitle": "Thêm người đọc và sách, chọn tên để mượn, rồi cập nhật khi trả.",
      "challenges": [
        {
          "id": "add-reader-v2",
          "type": "demo",
          "title": "Thêm người đọc qua F_NguoiDoc"
        },
        {
          "id": "add-book-v2",
          "type": "demo",
          "title": "Thêm sách qua F_Sach"
        },
        {
          "id": "loan-v2",
          "type": "demo",
          "title": "Mượn bằng hai danh mục vừa thêm"
        },
        {
          "id": "return-v2",
          "type": "demo",
          "title": "Cập nhật ngày trả và trạng thái"
        },
        {
          "id": "v2-f1",
          "type": "order",
          "title": "Danh mục mới, lượt mượn mới",
          "prompt": "Một người đọc mới mượn một sách mới. Cả hai chưa có trong CSDL. Sắp xếp để danh mục được lưu trước khi tạo lượt mượn.",
          "items": [
            {
              "id": "save",
              "text": "Nhập ngày và trạng thái rồi bấm Lưu"
            },
            {
              "id": "loan",
              "text": "Mở F_MuonTra, bấm Thêm mới, chọn hai tên"
            },
            {
              "id": "book",
              "text": "Thêm và lưu sách ở F_Sach"
            },
            {
              "id": "reader",
              "text": "Thêm và lưu người đọc ở F_NguoiDoc"
            }
          ],
          "answer": [
            "reader",
            "book",
            "loan",
            "save"
          ],
          "hint": "Khóa ngoại cần tham chiếu đến danh mục đã tồn tại.",
          "explanation": "Hai danh mục cần được lưu trước lượt mượn; có thể thêm người đọc hoặc thêm sách trước.",
          "acceptedAnswers": [
            [
              "reader",
              "book",
              "loan",
              "save"
            ],
            [
              "book",
              "reader",
              "loan",
              "save"
            ]
          ]
        },
        {
          "id": "v2-f2",
          "type": "truefalse",
          "title": "Đóng Form có luôn hủy dữ liệu?",
          "prompt": "Em đã sửa một bản ghi trên Form có liên kết. Bấm Đóng luôn hủy phần đang sửa nên không cần kiểm tra.",
          "answer": "Sai",
          "hint": "Form có liên kết có thể tự lưu khi chuyển bản ghi hoặc đóng.",
          "explanation": "Access có thể tự lưu bản ghi khi chuyển dòng hoặc đóng Form. Nút Lưu giúp chủ động lưu; muốn hủy phải dùng thao tác Undo phù hợp trước khi bản ghi được lưu."
        },
        {
          "id": "v2-f3",
          "type": "multi",
          "title": "Trả sách cho lượt đang có",
          "prompt": "Chọn hai việc cần làm khi sách của một lượt mượn đã được trả.",
          "options": [
            "Tìm đúng lượt và điền NgayTra",
            "Chọn Đã trả rồi lưu bản ghi",
            "Tự sửa MaMuonTra thành mã mới",
            "Thêm lượt mới chỉ để ghi ngày trả"
          ],
          "answer": [
            "Tìm đúng lượt và điền NgayTra",
            "Chọn Đã trả rồi lưu bản ghi"
          ],
          "hint": "Đây là thay đổi của một sự kiện mượn đã có.",
          "explanation": "Cập nhật đúng lượt giữ nguyên MaMuonTra, bổ sung ngày trả và chọn trạng thái phù hợp."
        }
      ]
    },
    {
      "id": "boss",
      "title": "Boss · Điều hành thư viện",
      "short": "Boss cuối",
      "kind": "boss",
      "subtitle": "Thiết kế và sử dụng đủ ba Form với dữ liệu nhất quán.",
      "challenges": [
        {
          "id": "v2-b1",
          "type": "select",
          "title": "Chọn đúng điều khiển",
          "prompt": "Ghép các trường ở F_MuonTra với điều khiển cần có.",
          "items": [
            {
              "label": "MaMuonTra",
              "options": [
                "Text Box chỉ đọc",
                "Combo Box chọn người",
                "Combo Box chọn sách"
              ],
              "answer": "Text Box chỉ đọc"
            },
            {
              "label": "SoTheTV",
              "options": [
                "Text Box nhập họ tên",
                "Combo Box chọn người",
                "Text Box nhập mã tự sinh"
              ],
              "answer": "Combo Box chọn người"
            },
            {
              "label": "MaSach",
              "options": [
                "Combo Box chọn sách",
                "Text Box nhập tên sách",
                "Text Box nhập mã tự sinh"
              ],
              "answer": "Combo Box chọn sách"
            },
            {
              "label": "TrangThai",
              "options": [
                "Combo Box danh sách giá trị",
                "Text Box nhập tùy ý",
                "Text Box chỉ đọc"
              ],
              "answer": "Combo Box danh sách giá trị"
            }
          ],
          "hint": "Một mã tự sinh, hai khóa ngoại và một danh sách trạng thái.",
          "explanation": "MaMuonTra chỉ đọc; hai khóa ngoại dùng danh sách tên; TrangThai chọn từ các giá trị quy ước."
        },
        {
          "id": "v2-b2",
          "type": "single",
          "title": "Tên nhìn thấy khác giá trị lưu",
          "prompt": "Combo Box người đọc có hai cột SoTheTV, HoVaTen; Bound Column = 1. Chọn Nguyễn Minh Hà có mã TV006. MƯỢN_TRẢ.SoTheTV lưu gì?",
          "options": [
            "TV006",
            "Nguyễn Minh Hà",
            "S006",
            "Số dòng thứ sáu"
          ],
          "answer": "TV006",
          "hint": "Bound Column chọn cột lấy giá trị, không phải cột đang nhìn thấy.",
          "explanation": "Giá trị lưu là TV006. Hiển thị tên không làm đổi kiểu hoặc ý nghĩa khóa ngoại."
        },
        {
          "id": "v2-b3",
          "type": "multi",
          "title": "Các nút làm đúng việc",
          "prompt": "Chọn hai nhận định đúng.",
          "options": [
            "Thêm mới mở bản ghi trống để nhập",
            "Lưu ghi thay đổi của bản ghi hiện tại",
            "Bản ghi sau tự tạo một mã thẻ mới",
            "Đóng luôn xóa dữ liệu vừa nhập"
          ],
          "answer": [
            "Thêm mới mở bản ghi trống để nhập",
            "Lưu ghi thay đổi của bản ghi hiện tại"
          ],
          "hint": "Phân biệt điều hướng với thêm và lưu dữ liệu.",
          "explanation": "Thêm mới và Lưu là hai thao tác khác nhau. Các nút chuyển bản ghi hoặc đóng Form không phải nút xóa."
        },
        {
          "id": "v2-b4",
          "type": "order",
          "title": "Kiểm tra sản phẩm cuối",
          "prompt": "Sắp xếp một lần kiểm thử đầy đủ.",
          "items": [
            {
              "id": "return",
              "text": "Tìm lại lượt, cập nhật ngày trả và trạng thái rồi lưu"
            },
            {
              "id": "verify",
              "text": "Mở bảng MƯỢN_TRẢ, kiểm tra mã thẻ và mã sách được lưu"
            },
            {
              "id": "borrow",
              "text": "Tạo lượt mượn bằng cách chọn hai tên vừa thêm"
            },
            {
              "id": "masters",
              "text": "Thêm một người đọc và một sách bằng hai Form danh mục"
            }
          ],
          "answer": [
            "masters",
            "borrow",
            "verify",
            "return"
          ],
          "hint": "Có danh mục trước, có lượt mượn sau, rồi kiểm chứng và cập nhật.",
          "explanation": "Kết quả cần được đối chiếu trong bảng, gồm cả khóa ngoại và mã lượt mượn giữ nguyên khi cập nhật."
        },
        {
          "id": "v2-b5",
          "type": "truefalse",
          "title": "AutoNumber có phải số thứ tự liên tục?",
          "prompt": "MaMuonTra có các giá trị 1, 2, 4. Vì thiếu số 3 nên em phải sửa mã 4 thành 3.",
          "answer": "Sai",
          "hint": "AutoNumber dùng nhận diện bản ghi, không phải số thứ tự để trình bày.",
          "explanation": "AutoNumber có thể có khoảng trống. Không sửa hoặc cố lấp khoảng trống của mã tự sinh."
        },
        {
          "id": "v2-b6",
          "type": "select",
          "title": "Danh mục và lượt mượn",
          "prompt": "Chọn đúng nơi thực hiện từng việc.",
          "items": [
            {
              "label": "Đổi email của người đọc",
              "options": [
                "F_NguoiDoc",
                "F_Sach",
                "F_MuonTra"
              ],
              "answer": "F_NguoiDoc"
            },
            {
              "label": "Nhập một đầu sách mới",
              "options": [
                "F_NguoiDoc",
                "F_Sach",
                "F_MuonTra"
              ],
              "answer": "F_Sach"
            },
            {
              "label": "Ghi nhận ngày trả sách",
              "options": [
                "F_NguoiDoc",
                "F_Sach",
                "F_MuonTra"
              ],
              "answer": "F_MuonTra"
            }
          ],
          "hint": "Thông tin thuộc bảng nào thì sử dụng Form gắn với bảng đó.",
          "explanation": "Ba Form phục vụ ba loại bản ghi; quan hệ nối dữ liệu nhưng không đổi nguồn của từng Form."
        },
        {
          "id": "v2-g1",
          "type": "single",
          "title": "Vàng · Hai người trùng tên",
          "prompt": "Danh sách người đọc có hai bạn trùng họ tên. Cải tiến phù hợp nhất là gì?",
          "options": [
            "Hiện thêm số thẻ để phân biệt",
            "Dùng họ tên làm khóa chính",
            "Lưu cả họ tên vào SoTheTV",
            "Chọn người đầu tiên cho nhanh"
          ],
          "answer": "Hiện thêm số thẻ để phân biệt",
          "hint": "Nhận diện người bằng khóa duy nhất dù giao diện ưu tiên tên.",
          "explanation": "Có thể hiển thị thêm lớp hoặc số thẻ trong danh sách, trong khi Bound Column vẫn trả số thẻ.",
          "advanced": true
        },
        {
          "id": "v2-g2",
          "type": "truefalse",
          "title": "Vàng · Đổi nhãn có đổi liên kết?",
          "prompt": "Đổi Label “Mã sách” thành “Tên sách” sẽ tự biến ô nhập thành Combo Box liên kết đúng bảng SÁCH.",
          "answer": "Sai",
          "hint": "Nhãn chỉ là chữ hướng dẫn bên cạnh điều khiển.",
          "explanation": "Cần dùng Combo Box và cấu hình Record Source, Control Source, Row Source, Bound Column. Đổi nhãn không thực hiện các việc đó.",
          "advanced": true
        }
      ]
    }
  ],
  "media": {
    "create": {
      "id": "dEaQIrw3CZY",
      "title": "Access: Creating Forms",
      "summary": "Tạo Form từ bảng và chọn các chế độ xem."
    },
    "use": {
      "id": "uTRdmSQjjm8",
      "title": "Access: Working with Forms",
      "summary": "Di chuyển, thêm và sửa bản ghi qua Form."
    }
  },
  "nativeVideos": [
    {
      "section": 1,
      "title": "Tạo khung Form bằng Wizard",
      "summary": "Ví dụ với MƯỢN_TRẢ; lặp lại cùng quy trình cho NGƯỜI ĐỌC và SÁCH, theo bảng tên Form và nguồn ở trên.",
      "src": "assets/video/three-forms-wizard.mp4",
      "poster": "assets/access/wizard-fields.png"
    },
    {
      "section": 1,
      "title": "AutoNumber, Combo Box và nút Lưu",
      "summary": "Xem Locked, Tab Stop, Bound Column, Value List và hành động SaveRecord trong Macro Builder.",
      "src": "assets/video/three-forms-config.mp4",
      "poster": "assets/access/v2-combo.png"
    },
    {
      "section": 2,
      "title": "Dùng đủ ba Form từ đầu đến cuối",
      "summary": "Thêm người đọc, thêm sách, chọn tên để mượn, cập nhật khi trả và kiểm tra mã thực sự trong bảng.",
      "src": "assets/video/three-forms-use.mp4",
      "poster": "assets/access/v2-loan.png"
    }
  ]
};
