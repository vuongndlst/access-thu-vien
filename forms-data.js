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
      "summary": "Ví dụ với MƯỢN_TRẢ; lặp lại cùng quy trình cho NGƯỜI ĐỌC và SÁCH, theo bảng tên Form và nguồn ở trên. Có lời đọc tiếng Việt bằng VieNeu-TTS, nhịp chậm và mục lục từng bước.",
      "src": "assets/video/three-forms-wizard.mp4?v=voice-20261117",
      "poster": "assets/access/wizard-fields.png",
      "captions": "assets/video/three-forms-wizard-vi.vtt",
      "slug": "three-forms-wizard",
      "chapters": [
        {
          "start": 0,
          "duration": 16.933,
          "title": "Chọn bảng MƯỢN_TRẢ",
          "step": 1,
          "narration": "Trong bài này, các em sẽ tạo ba biểu mẫu để quản lý thư viện. Trước hết, mở cơ sở dữ liệu đã có đủ ba bảng và hai quan hệ. Ở khung bên trái, bấm chọn bảng mượn trả. Đây sẽ là nguồn dữ liệu của biểu mẫu đầu tiên."
        },
        {
          "start": 16.933,
          "duration": 16.333,
          "title": "Mở thẻ Create",
          "step": 2,
          "narration": "Bây giờ, mở thẻ Create trên thanh công cụ. Thẻ này chứa các lệnh tạo đối tượng mới. Hãy quan sát tên bảng đang được chọn trước khi tiếp tục, để tránh tạo biểu mẫu từ nhầm bảng."
        },
        {
          "start": 33.266,
          "duration": 16.333,
          "title": "Chọn Form Wizard",
          "step": 3,
          "narration": "Trong nhóm Forms, chọn Form Wizard. Đây là trình hướng dẫn tạo biểu mẫu theo từng bước. Chúng ta sẽ lần lượt chọn bảng nguồn, chọn các trường, chọn bố cục và đặt tên biểu mẫu."
        },
        {
          "start": 49.599,
          "duration": 16.733,
          "title": "Chọn đủ bảy trường bằng nút >>",
          "step": 4,
          "narration": "Kiểm tra ô Tables and Queries đang chỉ đến bảng mượn trả. Bấm nút hai dấu lớn hơn để chuyển toàn bộ bảy trường sang danh sách Selected Fields. Các em hãy đếm lại: mã mượn trả, số thẻ, mã sách, ba trường ngày và trạng thái."
        },
        {
          "start": 66.332,
          "duration": 16.267,
          "title": "Next để chọn bố cục",
          "step": 5,
          "narration": "Khi danh sách bên phải đã đủ bảy trường, bấm Next. Nếu còn thiếu trường, quay lại để bổ sung ngay. Ở bước này, chúng ta mới chọn những trường xuất hiện trên giao diện, chưa thay đổi dữ liệu trong bảng."
        },
        {
          "start": 82.599,
          "duration": 16.333,
          "title": "Columnar hiển thị từng bản ghi. Bấm Next",
          "step": 6,
          "narration": "Chọn bố cục Columnar, rồi bấm Next. Bố cục này hiển thị thông tin của một bản ghi theo từng dòng, phù hợp để xem và nhập một lượt mượn. Các em hãy đối chiếu phần xem trước trước khi chuyển bước."
        },
        {
          "start": 98.932,
          "duration": 16.267,
          "title": "Đặt tên F_MuonTra",
          "step": 7,
          "narration": "Đặt tên biểu mẫu là F gạch dưới MuonTra, viết liền và không dấu, đúng như trên màn hình. Tiền tố F giúp nhận ra đây là một Form. Tên biểu mẫu và tên bảng nguồn là hai tên khác nhau."
        },
        {
          "start": 115.198,
          "duration": 19.1,
          "title": "Finish. Form hiển thị dữ liệu từ MƯỢN_TRẢ",
          "step": 8,
          "narration": "Bấm Finish để mở biểu mẫu. Dữ liệu đang thấy đến từ bảng mượn trả. Sau đó, thực hiện lại các bước vừa học với bảng người đọc để tạo F gạch dưới NguoiDoc, và với bảng sách để tạo F gạch dưới Sach. Hãy dừng video và tự tạo đủ ba Form trước khi xem phần cấu hình."
        }
      ],
      "checkpoint": {
        "question": "Form lấy dữ liệu từ đâu?",
        "options": [
          "Bảng hoặc truy vấn trong Record Source",
          "Chỉ từ tên của Form",
          "Từ ảnh nền"
        ],
        "answer": 0,
        "explanation": "Record Source xác định bảng hoặc truy vấn nguồn. Đổi tên Form không đổi nguồn dữ liệu.",
        "retry": "Nếu Form hiển thị thông tin người đọc, thuộc tính nào phải trỏ đến bảng NGƯỜI ĐỌC?"
      }
    },
    {
      "section": 1,
      "title": "AutoNumber, Combo Box và nút Lưu",
      "summary": "Xem Locked, Tab Stop, Bound Column, Value List và hành động SaveRecord trong Macro Builder. Có lời đọc tiếng Việt bằng VieNeu-TTS, nhịp chậm và mục lục từng bước.",
      "src": "assets/video/three-forms-config.mp4?v=voice-20261117",
      "poster": "assets/access/v2-combo.png",
      "captions": "assets/video/three-forms-config-vi.vtt",
      "slug": "three-forms-config",
      "chapters": [
        {
          "start": 0,
          "duration": 17.067,
          "title": "Mở View để chuyển sang Design View",
          "step": 1,
          "narration": "Sau khi có khung biểu mẫu, chúng ta cần cấu hình cách nhập dữ liệu. Trên Form mượn trả, mở nút View ở góc trên bên trái. Hãy phân biệt: Form View dùng để nhập dữ liệu; Design View dùng để chỉnh thiết kế và thuộc tính điều khiển."
        },
        {
          "start": 17.067,
          "duration": 16.333,
          "title": "Chọn Design View để cấu hình điều khiển và nút lệnh",
          "step": 2,
          "narration": "Chọn Design View. Nếu chưa thấy bảng thuộc tính, bấm phím F bốn để mở Property Sheet. Trong phần này, mẫu trên màn hình đã có các điều khiển; chúng ta sẽ lần lượt kiểm tra các thiết lập quan trọng."
        },
        {
          "start": 33.4,
          "duration": 16.333,
          "title": "Chọn ô MaMuonTra, không chọn nhãn bên trái",
          "step": 3,
          "narration": "Bấm vào ô dữ liệu mã mượn trả ở bên phải. Đừng chọn nhãn mô tả bên trái. Hãy nhìn tên điều khiển ở đầu Property Sheet để biết mình đang sửa đúng ô nhập liệu."
        },
        {
          "start": 49.733,
          "duration": 17.067,
          "title": "Thẻ Data: Control Source = MaMuonTra, Locked = Yes",
          "step": 4,
          "narration": "Ở thẻ Data, Control Source phải là MaMuonTra để ô gắn với đúng trường. Đặt Locked bằng Yes để người dùng không sửa mã. Việc sinh số tự động đến từ kiểu AutoNumber của trường trong bảng, chứ không phải do thuộc tính Locked."
        },
        {
          "start": 66.799,
          "duration": 16.267,
          "title": "Thẻ Other: Tab Stop = No để bỏ qua ô mã tự sinh khi bấm Tab",
          "step": 5,
          "narration": "Chuyển sang thẻ Other. Đặt Tab Stop bằng No để khi bấm Tab, con trỏ bỏ qua ô mã tự sinh. Mã có thể không liên tiếp sau một lần hủy nhập. Các em không sửa mã để lấp những số bị thiếu."
        },
        {
          "start": 83.066,
          "duration": 16.9,
          "title": "Chọn Combo Box sách để kiểm tra nguồn danh sách và trường lưu mã",
          "step": 6,
          "narration": "Tiếp theo, chọn Combo Box dùng để chọn sách. Nếu Form mới tạo còn là Text Box, hãy đổi điều khiển này sang Combo Box trong Design View. Mục tiêu là chọn sách từ danh mục có sẵn, giúp hạn chế gõ sai mã."
        },
        {
          "start": 99.966,
          "duration": 16.267,
          "title": "Thẻ Data: Control Source = MaSach; Bound Column = 1; Limit To List = Yes",
          "step": 7,
          "narration": "Ở thẻ Data, Control Source là MaSach, đây là trường nhận giá trị. Bound Column bằng một để lấy mã ở cột đầu của danh sách. Đặt Limit To List bằng Yes để chỉ chấp nhận sách có trong danh mục."
        },
        {
          "start": 116.233,
          "duration": 17.067,
          "title": "Có thể hiển thị tên kèm mã để phân biệt sách trùng tên",
          "step": 8,
          "narration": "Row Source cung cấp hai cột: mã sách và phần tên hiển thị. Có thể ghép thêm mã sau tên, như mẫu trên màn hình, để phân biệt hai sách trùng tên. Chọn tên để thao tác thuận tiện, nhưng giá trị lưu vẫn là mã sách."
        },
        {
          "start": 133.299,
          "duration": 19.067,
          "title": "Thẻ Format: Column Count = 2, Column Widths ẩn cột mã đầu tiên",
          "step": 9,
          "narration": "Ở thẻ Format, đặt Column Count bằng hai. Column Widths bằng không xăng ti mét, chấm phẩy, sáu xăng ti mét, để ẩn cột mã và hiện cột tên. Làm tương tự với người đọc: danh sách lấy số thẻ và họ tên, nhưng Control Source phải là SoTheTV."
        },
        {
          "start": 152.366,
          "duration": 16.267,
          "title": "Chọn dropdown TrangThai để kiểm tra danh sách giá trị",
          "step": 10,
          "narration": "Bây giờ chọn Combo Box trạng thái. Danh sách này không lấy từ bảng sách hoặc bảng người đọc. Chúng ta dùng một danh sách giá trị cố định, vì trạng thái trong bài chỉ có đang mượn và đã trả."
        },
        {
          "start": 168.633,
          "duration": 19.167,
          "title": "TrangThai: Value List, Đang mượn/Đã trả và Limit To List = Yes",
          "step": 11,
          "narration": "Ở thẻ Data, Control Source là TrangThai. Row Source Type chọn Value List. Row Source gồm hai giá trị đang mượn và đã trả, ngăn cách bằng dấu chấm phẩy. Đặt Limit To List bằng Yes để dữ liệu không bị nhập thành nhiều cách viết khác nhau."
        },
        {
          "start": 187.799,
          "duration": 15.933,
          "title": "Chọn nút Lưu để xem hành động khi bấm",
          "step": 12,
          "narration": "Tiếp theo, chọn nút Lưu. Một nút lệnh cần có hành động khi được bấm; chỉ đặt chữ Lưu trên nút thì chưa đủ. Các em hãy kiểm tra đúng nút trước khi mở phần sự kiện."
        },
        {
          "start": 203.732,
          "duration": 16.267,
          "title": "Thẻ Event: On Click gắn với Embedded Macro",
          "step": 13,
          "narration": "Mở thẻ Event. Dòng On Click là hành động chạy khi bấm nút. Trong mẫu này, On Click gắn với Embedded Macro, tức là macro được lưu ngay trong biểu mẫu."
        },
        {
          "start": 219.999,
          "duration": 16.333,
          "title": "Bấm dấu ba chấm để mở Macro Builder",
          "step": 14,
          "narration": "Bấm nút ba chấm ở cuối dòng On Click để mở Macro Builder. Nếu đang tạo nút mới, các em có thể dùng trình hướng dẫn nút lệnh và chọn chức năng lưu bản ghi, rồi kiểm tra lại hành động tại đây."
        },
        {
          "start": 236.332,
          "duration": 17.233,
          "title": "Nút Lưu dùng RunMenuCommand với Command = SaveRecord",
          "step": 15,
          "narration": "Nút Lưu sử dụng RunMenuCommand, với Command là SaveRecord. Mẫu có điều kiện chỉ lưu khi bản ghi đang thay đổi. Chú ý phân biệt: lưu bản ghi là ghi dữ liệu vào bảng; lưu thiết kế Form là ghi lại bố cục và các thuộc tính."
        },
        {
          "start": 253.565,
          "duration": 20.5,
          "title": "Lưu macro, sau đó trở về và lưu thiết kế Form",
          "step": 16,
          "narration": "Lưu macro, đóng cửa sổ macro và lưu thiết kế biểu mẫu. Cả ba Form cần có thêm mới, lưu, bản ghi trước, bản ghi sau và đóng. Kiểm tra từng nút trong Form View. Hãy dừng video để tự thử: ô mã mượn trả phải chỉ đọc; hai danh mục và trạng thái phải chọn được từ danh sách."
        }
      ],
      "checkpoint": {
        "question": "Chọn một tên sách trong Combo Box thì trường MaSach phải lưu gì?",
        "options": [
          "Tên sách",
          "Mã của sách đã chọn",
          "Vị trí dòng trong danh sách"
        ],
        "answer": 1,
        "explanation": "Bound Column = 1 lấy mã ở cột đầu; Control Source = MaSach ghi mã đó vào trường MaSach của lượt mượn.",
        "retry": "Danh sách có cột đầu S006 và cột sau là tên sách. Với Bound Column = 1, giá trị được lấy ở cột nào?"
      }
    },
    {
      "section": 2,
      "title": "Dùng đủ ba Form từ đầu đến cuối",
      "summary": "Thêm người đọc, thêm sách, chọn tên để mượn, cập nhật khi trả và kiểm tra mã thực sự trong bảng. Có lời đọc tiếng Việt bằng VieNeu-TTS, nhịp chậm và mục lục từng bước.",
      "src": "assets/video/three-forms-use.mp4?v=voice-20261117",
      "poster": "assets/access/v2-loan.png",
      "captions": "assets/video/three-forms-use-vi.vtt",
      "slug": "three-forms-use",
      "chapters": [
        {
          "start": 0,
          "duration": 17.067,
          "title": "F_NguoiDoc: bấm Thêm mới để tạo người đọc",
          "step": 1,
          "narration": "Chúng ta sẽ làm một quy trình hoàn chỉnh: thêm người đọc, thêm sách, lập lượt mượn và cập nhật khi trả sách. Mở Form người đọc, rồi bấm Thêm mới. Nút này chuyển đến bản ghi mới, chưa có nghĩa là mọi thông tin đã được lưu hợp lệ."
        },
        {
          "start": 17.067,
          "duration": 16.167,
          "title": "Nhập số thẻ duy nhất và thông tin người đọc",
          "step": 2,
          "narration": "Nhập số thẻ mới là T V không không sáu, cùng họ tên và các thông tin còn lại. Số thẻ ở bảng người đọc là Short Text, nên các em nhập một mã duy nhất. Không dùng số thẻ đã có cho một người khác."
        },
        {
          "start": 33.233,
          "duration": 16.333,
          "title": "Bấm Lưu để ghi người đọc TV006 vào bảng NGƯỜI ĐỌC",
          "step": 3,
          "narration": "Kiểm tra các ô vừa nhập, rồi bấm Lưu. Thao tác này ghi người đọc mới vào bảng người đọc. Nếu có lỗi trùng khóa hoặc thiếu dữ liệu bắt buộc, hãy sửa thông tin trước khi tiếp tục."
        },
        {
          "start": 49.566,
          "duration": 16.333,
          "title": "Bản ghi trước chỉ chuyển đến người đọc đã lưu",
          "step": 4,
          "narration": "Bấm Bản ghi trước để xem người đọc đã lưu ở trước đó. Quan sát số thẻ và họ tên thay đổi. Nút điều hướng giúp xem bản ghi khác; nó không phải là nút tạo thêm người đọc."
        },
        {
          "start": 65.899,
          "duration": 16.267,
          "title": "Bản ghi sau trở lại người đọc TV006; không tạo thêm bản ghi",
          "step": 5,
          "narration": "Bấm Bản ghi sau để trở lại người đọc vừa thêm. Kiểm tra số thẻ T V không không sáu và thông tin đã lưu. Đây là một cách tự kiểm tra rằng bản ghi vẫn có thể mở lại sau khi chuyển đi."
        },
        {
          "start": 82.166,
          "duration": 16.267,
          "title": "F_Sach: bấm Thêm mới để tạo một đầu sách",
          "step": 6,
          "narration": "Tiếp theo, mở Form sách và bấm Thêm mới. Chúng ta cần có sách trong danh mục trước khi chọn sách đó cho một lượt mượn. Mỗi Form đang làm việc với bảng nguồn tương ứng của nó."
        },
        {
          "start": 98.433,
          "duration": 16.167,
          "title": "Nhập mã sách S006 và thông tin đầu sách mới",
          "step": 7,
          "narration": "Nhập mã sách S không không sáu và các thông tin của đầu sách mới. Mã sách phải duy nhất. Năm xuất bản và số lượng tồn dùng kiểu số nguyên; không nhập phần thập phân vào hai trường này."
        },
        {
          "start": 114.599,
          "duration": 16.333,
          "title": "Lưu sách mới để mã S006 có trong danh mục",
          "step": 8,
          "narration": "Bấm Lưu để ghi đầu sách vào bảng sách. Sau bước này, mã S không không sáu mới là một mã hợp lệ để được tham chiếu trong bảng mượn trả. Hãy dừng video nếu các em chưa hoàn thành hai danh mục."
        },
        {
          "start": 130.932,
          "duration": 16.333,
          "title": "Đóng Form sách sau khi lưu dữ liệu",
          "step": 9,
          "narration": "Sau khi lưu, bấm Đóng để đóng Form sách. Đóng Form không phải là xóa bảng hoặc xóa dữ liệu. Khi tự làm bài, hãy bấm Lưu và kiểm tra kết quả trước khi đóng."
        },
        {
          "start": 147.265,
          "duration": 16.333,
          "title": "Mở F_MuonTra để chọn các danh mục vừa thêm",
          "step": 10,
          "narration": "Mở Form mượn trả. Chúng ta sẽ dùng đúng người đọc và sách vừa thêm để tạo một lượt mượn. Nếu danh sách đang mở từ trước, hãy cập nhật lại danh sách hoặc mở lại Form để thấy dữ liệu mới."
        },
        {
          "start": 163.598,
          "duration": 17.367,
          "title": "Thêm lượt mượn mới. Bỏ qua MaMuonTra vì đây là AutoNumber",
          "step": 11,
          "narration": "Bấm Thêm mới. Bỏ qua mã mượn trả vì Access sẽ tự cấp mã. Trong bản ghi mẫu, mã sau khi lưu là mười hai; máy của các em có thể là số khác. Điều cần kiểm tra là mã được sinh tự động, không phải giống đúng số trong video."
        },
        {
          "start": 180.965,
          "duration": 16.267,
          "title": "Mở dropdown Người đọc để chọn theo họ tên",
          "step": 12,
          "narration": "Mở danh sách Người đọc bằng mũi tên ở cuối ô. Quan sát danh sách hiện họ tên kèm số thẻ. Cách này giúp tìm đúng người, nhất là khi hai người có cùng họ tên."
        },
        {
          "start": 197.232,
          "duration": 16.333,
          "title": "Chọn Nguyễn Minh Hà. SoTheTV sẽ nhận TV006",
          "step": 13,
          "narration": "Chọn Nguyễn Minh Hà, có số thẻ T V không không sáu. Trên giao diện, chúng ta nhìn thấy tên dễ đọc. Ở trường số thẻ của lượt mượn, giá trị được lưu sẽ là mã thẻ tương ứng."
        },
        {
          "start": 213.565,
          "duration": 16.333,
          "title": "Hiển thị tên kèm mã để phân biệt các sách trùng tên",
          "step": 14,
          "narration": "Mở danh sách sách. Hai đầu sách có thể trùng tên, vì vậy các em hãy nhìn thêm mã phía sau tên để phân biệt. Không chọn chỉ dựa vào tên khi danh mục có các dòng giống nhau."
        },
        {
          "start": 229.898,
          "duration": 16.267,
          "title": "Chọn Khám phá dữ liệu · S006. Giá trị lưu là S006",
          "step": 15,
          "narration": "Chọn Khám phá dữ liệu, mã S không không sáu. Kiểm tra đúng mã vừa thêm ở Form sách. Combo Box hiển thị tên kèm mã, nhưng cột được ràng buộc vẫn lấy mã S không không sáu để lưu."
        },
        {
          "start": 246.164,
          "duration": 16.3,
          "title": "Điền ngày mượn, hạn trả. Chưa trả thì để trống NgayTra",
          "step": 16,
          "narration": "Nhập ngày mượn và hạn trả phù hợp. Trong ví dụ, ngày mượn là mười ba tháng mười một, hạn trả là hai mươi tháng mười một. Sách chưa được trả thì để trống ngày trả. Máy trong video hiển thị ngày theo thứ tự tháng, ngày, năm."
        },
        {
          "start": 262.464,
          "duration": 16.333,
          "title": "Trạng thái chọn từ danh sách cố định, không gõ tùy ý",
          "step": 17,
          "narration": "Mở danh sách trạng thái. Các em sẽ thấy hai giá trị chuẩn là đang mượn và đã trả. Chúng ta chọn từ danh sách thay vì tự gõ những cách diễn đạt khác nhau."
        },
        {
          "start": 278.797,
          "duration": 16.267,
          "title": "Chọn Đang mượn cho lượt vừa tạo",
          "step": 18,
          "narration": "Chọn Đang mượn cho lượt vừa tạo. Kiểm tra lại: đúng người đọc, đúng sách, có ngày mượn và hạn trả, ngày trả còn trống. Hãy dừng một chút để đối chiếu trước khi lưu."
        },
        {
          "start": 295.064,
          "duration": 16.333,
          "title": "Lưu lượt mượn. MaMuonTra 12 do Access sinh tự động",
          "step": 19,
          "narration": "Bấm Lưu. Access tự sinh mã mượn trả; ở ví dụ này là mười hai. Các em hãy ghi nhớ mã trên máy của mình để mở lại đúng lượt khi cần cập nhật việc trả sách."
        },
        {
          "start": 311.397,
          "duration": 16.267,
          "title": "Khi trả sách, cập nhật đúng lượt 12 và nhập ngày trả",
          "step": 20,
          "narration": "Khi người đọc trả sách, mở lại đúng lượt mượn đã lưu. Không tạo lượt mượn mới chỉ để ghi việc trả. Ở bản ghi mẫu, nhập ngày trả là mười bốn tháng mười một vào ô ngày trả."
        },
        {
          "start": 327.664,
          "duration": 16.2,
          "title": "Chọn trạng thái Đã trả trong dropdown",
          "step": 21,
          "narration": "Mở dropdown trạng thái để chuyển lượt này sang đã trả. Việc đổi trạng thái phải đi cùng thông tin ngày trả phù hợp. Hãy quan sát mã lượt mượn vẫn giữ nguyên."
        },
        {
          "start": 343.864,
          "duration": 16.2,
          "title": "Đã trả là một lựa chọn chuẩn, không nhập nhiều cách viết khác nhau",
          "step": 22,
          "narration": "Chọn Đã trả từ danh sách cố định. Cách chọn này giữ dữ liệu thống nhất, giúp việc lọc hoặc thống kê sau này chính xác hơn. Chúng ta đang cập nhật lượt cũ, không thêm một dòng mới."
        },
        {
          "start": 360.064,
          "duration": 16.267,
          "title": "Lưu cập nhật ngày trả. MaMuonTra vẫn là 12",
          "step": 23,
          "narration": "Bấm Lưu để ghi ngày trả và trạng thái mới. Kiểm tra mã mượn trả vẫn là mười hai trong bản ghi mẫu. Mã khóa chính giúp nhận diện đúng lượt, kể cả khi nội dung của lượt đó được cập nhật."
        },
        {
          "start": 376.33,
          "duration": 16.267,
          "title": "Mở bảng MƯỢN_TRẢ để kiểm chứng mã được lưu",
          "step": 24,
          "narration": "Cuối cùng, mở bảng mượn trả để kiểm chứng dữ liệu thật. Tìm đến đúng mã lượt vừa thao tác. Đối chiếu các cột số thẻ, mã sách, ngày trả và trạng thái với thông tin trên Form."
        },
        {
          "start": 392.597,
          "duration": 19.167,
          "title": "Lượt 12 lưu TV006 và S006, cùng ngày trả và trạng thái Đã trả",
          "step": 25,
          "narration": "Kết quả mẫu lưu số thẻ T V không không sáu và mã sách S không không sáu, cùng ngày trả và trạng thái đã trả. Tên giúp chúng ta chọn thuận tiện; mã giữ liên kết giữa các bảng. Bây giờ, hãy tự làm lại một lượt với dữ liệu khác, rồi trả lời checkpoint trên web."
        }
      ],
      "checkpoint": {
        "question": "Khi sách được trả, em làm gì?",
        "options": [
          "Sửa MaMuonTra thành mã mới",
          "Thêm một lượt mượn mới",
          "Mở lượt cũ, nhập NgayTra, chọn Đã trả và lưu"
        ],
        "answer": 2,
        "explanation": "Cập nhật đúng lượt đã lưu giúp giữ một bản ghi cho một lượt mượn; AutoNumber của lượt đó không đổi.",
        "retry": "Sau khi cập nhật ngày trả, mã khóa chính của lượt mượn cũ có cần thay đổi không?"
      }
    }
  ]
};
