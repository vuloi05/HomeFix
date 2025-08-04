![Nền tảng](https://img.shields.io/badge/platform-React%20Native-blue)
![Giấy phép](https://img.shields.io/badge/license-MIT-green)
![Trạng thái](https://img.shields.io/badge/status-beta-orange)


# HomeFix - Ứng dụng dịch vụ sửa chữa tại nhà

> 🇬🇧 English: [README.md](./README.md)

## Tổng quan
HomeFix là ứng dụng di động xây dựng bằng React Native (Expo) và TypeScript, mô phỏng quy trình đặt và quản lý dịch vụ sửa chữa tại nhà. Dự án tập trung vào trải nghiệm người dùng, kiến trúc code rõ ràng, dễ mở rộng, phù hợp cho học tập, demo hoặc làm nền tảng phát triển thực tế.

## 🔑 Tính năng

| Vai trò     | Chức năng chính                                                                 |
|-------------|---------------------------------------------------------------------------------|
| Khách hàng  | - Đặt dịch vụ qua form động <br> - Xem xác nhận đơn hàng <br> - Quản lý đơn qua tab "Quản lý đơn hàng" <br> - Giao diện hiện đại, tối ưu mobile |
| Thợ         | - Xem, lọc, cập nhật trạng thái đơn hàng <br> - Xem chi tiết đơn hàng           |
| Admin       | - (Sắp ra mắt) Quản lý toàn bộ hệ thống                                         |

## 📱 Ảnh minh họa

![Màn hình chào mừng](./App%20Welcome.jpg)

<!-- Thêm các ảnh chụp màn hình khác nếu có -->

## 🧱 Tổng quan kiến trúc

- **Frontend**: React Native (Expo), TypeScript
- **Quản lý state**: React Context API + AsyncStorage
- **Điều hướng**: React Navigation v6 (Stack + Bottom Tabs)
- **Backend**: Mock (dễ tích hợp REST/GraphQL thực tế)
- **Thiết kế mở rộng**: Cấu trúc module, dễ phát triển thêm

## 🚀 Cài đặt & chạy thử

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd home-repair-service
   ```
2. **Cài đặt dependencies**
   ```bash
   npm install
   ```
3. **Chạy ứng dụng**
   ```bash
   npm run android   # Android
   npm run ios       # iOS (macOS)
   npm run web       # Web
   ```

## 📂 Cấu trúc thư mục

```
home-repair-service/
├── components/          # Component tái sử dụng
├── screens/            # Các màn hình
├── services/           # Dịch vụ API
├── Constants/          # Hằng số ứng dụng
├── types/              # Định nghĩa TypeScript
├── Navigation/         # Điều hướng
└── App.tsx            # Component gốc
```

## 🤝 Hướng dẫn đóng góp

- Chỉ sử dụng TypeScript & function component
- Đặt tên biến/hàm tiếng Anh, UI tiếng Việt
- Tách biệt logic và UI
- Đóng góp qua Pull Request

## Định hướng mở rộng

- [ ] Kết nối backend thực tế (REST API, GraphQL, ...)
- [ ] Đăng nhập/đăng ký (Authentication)
- [ ] Push notification
- [ ] Thanh toán online
- [ ] Chat real-time
- [ ] Đánh giá, review dịch vụ
- [ ] Định vị, bản đồ
- [ ] Upload ảnh vấn đề cần sửa

---

> Xem thêm: [docs/Troubleshooting.md](./docs/Troubleshooting.md)
> 
> Quay lại README tiếng Anh: [README.md](./README.md)

## Giấy phép

MIT License

---

> 🌐 Chuyển sang tiếng Anh: [README.md](./README.md)
