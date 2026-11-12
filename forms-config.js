"use strict";
window.FORMS_CONFIG = [
  {
    "key": "reader",
    "name": "F_NguoiDoc",
    "title": "Người đọc",
    "table": "NGƯỜI ĐỌC",
    "pk": "SoTheTV",
    "task": "config-reader-v2",
    "fields": [
      [
        "SoTheTV",
        "Số thẻ",
        "text",
        10
      ],
      [
        "HoVaTen",
        "Họ và tên",
        "text",
        50
      ],
      [
        "NgaySinh",
        "Ngày sinh",
        "date",
        0
      ],
      [
        "GioiTinh",
        "Giới tính",
        "text",
        10
      ],
      [
        "DiaChi",
        "Địa chỉ",
        "text",
        100
      ],
      [
        "DienThoai",
        "Điện thoại",
        "text",
        20
      ],
      [
        "Lop",
        "Lớp",
        "text",
        20
      ],
      [
        "Email",
        "Email",
        "text",
        50
      ]
    ]
  },
  {
    "key": "book",
    "name": "F_Sach",
    "title": "Sách",
    "table": "SÁCH",
    "pk": "MaSach",
    "task": "config-book-v2",
    "fields": [
      [
        "MaSach",
        "Mã sách",
        "text",
        10
      ],
      [
        "TenSach",
        "Tên sách",
        "text",
        100
      ],
      [
        "TacGia",
        "Tác giả",
        "text",
        50
      ],
      [
        "NhaXuatBan",
        "Nhà xuất bản",
        "text",
        50
      ],
      [
        "NamXuatBan",
        "Năm xuất bản",
        "number",
        0
      ],
      [
        "TheLoai",
        "Thể loại",
        "text",
        50
      ],
      [
        "SoLuongTon",
        "Số lượng tồn",
        "number",
        0
      ]
    ]
  },
  {
    "key": "loan",
    "name": "F_MuonTra",
    "title": "Mượn trả",
    "table": "MƯỢN_TRẢ",
    "pk": "MaMuonTra",
    "task": "config-loan-v2",
    "fields": [
      [
        "MaMuonTra",
        "Mã mượn trả",
        "auto",
        0
      ],
      [
        "SoTheTV",
        "Người đọc",
        "reader",
        10
      ],
      [
        "MaSach",
        "Sách",
        "book",
        10
      ],
      [
        "NgayMuon",
        "Ngày mượn",
        "date",
        0
      ],
      [
        "HanTra",
        "Hạn trả",
        "date",
        0
      ],
      [
        "NgayTra",
        "Ngày trả",
        "date",
        0
      ],
      [
        "TrangThai",
        "Trạng thái",
        "status",
        20
      ]
    ]
  }
];
window.FORMS_SEED = {
  "reader": [
    {
      "SoTheTV": "TV001",
      "HoVaTen": "Nguyễn An",
      "NgaySinh": "2009-04-06",
      "GioiTinh": "Nam",
      "DiaChi": "Khu A, phòng 01",
      "DienThoai": "0000000001",
      "Lop": "11A1",
      "Email": "tv001@example.com"
    },
    {
      "SoTheTV": "TV002",
      "HoVaTen": "Trần Bình",
      "NgaySinh": "2009-06-12",
      "GioiTinh": "Nữ",
      "DiaChi": "Khu A, phòng 02",
      "DienThoai": "0000000002",
      "Lop": "11A1",
      "Email": "tv002@example.com"
    },
    {
      "SoTheTV": "TV003",
      "HoVaTen": "Lê Chi",
      "NgaySinh": "2009-08-21",
      "GioiTinh": "Nữ",
      "DiaChi": "Khu B, phòng 01",
      "DienThoai": "0000000003",
      "Lop": "11A2",
      "Email": "tv003@example.com"
    },
    {
      "SoTheTV": "TV004",
      "HoVaTen": "Phạm Duy",
      "NgaySinh": "2009-09-17",
      "GioiTinh": "Nam",
      "DiaChi": "Khu B, phòng 02",
      "DienThoai": "0000000004",
      "Lop": "11A2",
      "Email": "tv004@example.com"
    },
    {
      "SoTheTV": "TV005",
      "HoVaTen": "Võ Hà",
      "NgaySinh": "2009-10-05",
      "GioiTinh": "Nữ",
      "DiaChi": "Khu C, phòng 01",
      "DienThoai": "0000000005",
      "Lop": "11A3",
      "Email": "tv005@example.com"
    }
  ],
  "book": [
    {
      "MaSach": "S001",
      "TenSach": "Bản đồ bầu trời",
      "TacGia": "An Minh",
      "NhaXuatBan": "NXB Học Đường",
      "NamXuatBan": 2022,
      "TheLoai": "Khoa học",
      "SoLuongTon": 6
    },
    {
      "MaSach": "S002",
      "TenSach": "Khu vườn bốn mùa",
      "TacGia": "Hà Thu",
      "NhaXuatBan": "NXB Học Đường",
      "NamXuatBan": 2023,
      "TheLoai": "Thiên nhiên",
      "SoLuongTon": 4
    },
    {
      "MaSach": "S003",
      "TenSach": "Nhật ký trên đảo",
      "TacGia": "Nam Sơn",
      "NhaXuatBan": "NXB Cánh Diều",
      "NamXuatBan": 2021,
      "TheLoai": "Truyện",
      "SoLuongTon": 3
    },
    {
      "MaSach": "S004",
      "TenSach": "Khám phá dữ liệu",
      "TacGia": "Mai Lam",
      "NhaXuatBan": "NXB Tri Thức Mở",
      "NamXuatBan": 2024,
      "TheLoai": "Tin học",
      "SoLuongTon": 8
    },
    {
      "MaSach": "S005",
      "TenSach": "Toán quanh ta",
      "TacGia": "Bảo Vân",
      "NhaXuatBan": "NXB Tri Thức Mở",
      "NamXuatBan": 2025,
      "TheLoai": "Toán học",
      "SoLuongTon": 5
    }
  ],
  "loan": [
    {
      "MaMuonTra": 1,
      "SoTheTV": "TV001",
      "MaSach": "S001",
      "NgayMuon": "2026-10-21",
      "HanTra": "2026-10-28",
      "NgayTra": "2026-10-24",
      "TrangThai": "Đã trả"
    },
    {
      "MaMuonTra": 2,
      "SoTheTV": "TV002",
      "MaSach": "S002",
      "NgayMuon": "2026-10-22",
      "HanTra": "2026-10-29",
      "NgayTra": "2026-10-25",
      "TrangThai": "Đã trả"
    },
    {
      "MaMuonTra": 3,
      "SoTheTV": "TV003",
      "MaSach": "S003",
      "NgayMuon": "2026-10-23",
      "HanTra": "2026-10-30",
      "NgayTra": "2026-10-26",
      "TrangThai": "Đã trả"
    },
    {
      "MaMuonTra": 4,
      "SoTheTV": "TV004",
      "MaSach": "S004",
      "NgayMuon": "2026-10-24",
      "HanTra": "2026-10-31",
      "NgayTra": "2026-10-27",
      "TrangThai": "Đã trả"
    },
    {
      "MaMuonTra": 5,
      "SoTheTV": "TV005",
      "MaSach": "S005",
      "NgayMuon": "2026-10-25",
      "HanTra": "2026-11-01",
      "NgayTra": "2026-10-28",
      "TrangThai": "Đã trả"
    },
    {
      "MaMuonTra": 6,
      "SoTheTV": "TV001",
      "MaSach": "S002",
      "NgayMuon": "2026-10-26",
      "HanTra": "2026-11-02",
      "NgayTra": "2026-10-29",
      "TrangThai": "Đã trả"
    },
    {
      "MaMuonTra": 7,
      "SoTheTV": "TV002",
      "MaSach": "S003",
      "NgayMuon": "2026-10-27",
      "HanTra": "2026-11-03",
      "NgayTra": "",
      "TrangThai": "Đang mượn"
    },
    {
      "MaMuonTra": 8,
      "SoTheTV": "TV003",
      "MaSach": "S004",
      "NgayMuon": "2026-10-28",
      "HanTra": "2026-11-04",
      "NgayTra": "",
      "TrangThai": "Đang mượn"
    },
    {
      "MaMuonTra": 9,
      "SoTheTV": "TV004",
      "MaSach": "S005",
      "NgayMuon": "2026-10-29",
      "HanTra": "2026-11-05",
      "NgayTra": "",
      "TrangThai": "Đang mượn"
    },
    {
      "MaMuonTra": 11,
      "SoTheTV": "TV005",
      "MaSach": "S001",
      "NgayMuon": "2026-10-30",
      "HanTra": "2026-11-06",
      "NgayTra": "",
      "TrangThai": "Đang mượn"
    }
  ]
};
