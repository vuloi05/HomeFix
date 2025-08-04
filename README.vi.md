
![Nền tảng](https://img.shields.io/badge/platform-React%20Native-blue)
![Giấy phép](https://img.shields.io/badge/license-MIT-green)
![Trạng thái](https://img.shields.io/badge/status-beta-orange)

# HomeFix - Ứng dụng dịch vụ sửa chữa tại nhà

> 🇬🇧 English: [README.md](./README.md)

## Tổng quan
HomeFix là ứng dụng di động xây dựng bằng React Native (Expo) và TypeScript, mô phỏng quy trình đặt và quản lý dịch vụ sửa chữa tại nhà. Dự án tập trung vào trải nghiệm người dùng, kiến trúc code rõ ràng, dễ mở rộng, phù hợp cho học tập, demo hoặc làm nền tảng phát triển thực tế.

## 🔑 Luồng người dùng & Tính năng

### 1. Chọn vai trò & đăng nhập mẫu
- Khi mở app, người dùng chọn vai trò: **Khách hàng** hoặc **Thợ** (hoặc Admin sắp ra mắt).
- Sau đó chọn 1 user mẫu tương ứng để đăng nhập nhanh (dữ liệu mẫu có sẵn).

### 2. Luồng Khách hàng
- Đặt dịch vụ qua form động (tự động điền thông tin user mẫu).
- Xem xác nhận đơn hàng vừa tạo.
- Quản lý tất cả đơn của mình ở tab "Quản lý đơn hàng" (chỉ thấy đơn của chính mình).
- Nhận thông báo khi đơn được thợ nhận.

### 3. Luồng Thợ
- Xem danh sách các đơn **chưa ai nhận** hoặc **đơn do chính mình đã nhận**.
- Nhận đơn mới (chỉ 1 thợ nhận được mỗi đơn, các thợ khác sẽ không còn thấy đơn đó).
- Hủy nhận đơn (đơn quay lại trạng thái chờ, các thợ khác lại thấy).
- Cập nhật trạng thái đơn (chỉ với đơn mình đã nhận).

### 4. Luồng Admin (sắp ra mắt)
- Quản lý toàn bộ hệ thống, xem tất cả đơn hàng, người dùng, ...

### 5. Giao diện & trải nghiệm
- Giao diện hiện đại, tối ưu mobile.
- Đa dạng trạng thái đơn, popup chi tiết đơn hàng theo vai trò.

## � Cài đặt & chạy thử

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

## 🧱 Tổng quan kiến trúc

- **Frontend**: React Native (Expo), TypeScript
- **Quản lý state**: React Context API + AsyncStorage
- **Điều hướng**: React Navigation v6 (Stack + Bottom Tabs)
- **Backend**: Mock (dễ tích hợp REST/GraphQL thực tế)
- **Thiết kế mở rộng**: Cấu trúc module, dễ phát triển thêm

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

## 🧑‍💻 Hướng dẫn sử dụng mock data

- Dữ liệu user mẫu (khách hàng/thợ) nằm trong thư mục `home-repair-service/mock-data/`:
  - `mockCustomers.json`: Danh sách khách hàng mẫu
  - `mockWorkers.json`: Danh sách thợ mẫu
- Khi chọn vai trò, bạn sẽ chọn 1 user mẫu để đăng nhập nhanh.
- Có thể chỉnh sửa/thêm user mẫu bằng cách sửa file JSON tương ứng (thêm/sửa/xóa user, đổi thông tin, ...).
- Khi tạo đơn, thông tin user mẫu sẽ tự động điền vào form.

### Khách hàng mẫu

| ID  | Tên            | Số điện thoại | Địa chỉ                        | Ghi chú                      |
|-----|----------------|---------------|-------------------------------|------------------------------|
| c1  | Nguyen Van A   | 0901234567    | 123 Le Loi, Q.1, TP.HCM       | Khách quen, ưu tiên phục vụ. |
| c2  | Tran Thi B     | 0912345678    | 456 Tran Hung Dao, Q.5, TP.HCM| Yêu cầu sửa điện lạnh.       |
| c3  | Le Van C       | 0987654321    | 789 Nguyen Trai, Q.10, TP.HCM | Nhà có trẻ nhỏ, cần sửa nhanh.|

### Thợ mẫu

| ID  | Tên            | Số điện thoại | Chuyên môn   | Đánh giá | Ghi chú                        |
|-----|----------------|---------------|--------------|----------|-------------------------------|
| w1  | Pham Quang D   | 0932123456    | Điện nước    | 4.8      | Kinh nghiệm 5 năm, phục vụ tận nơi. |
| w2  | Nguyen Thi E   | 0943234567    | Điện lạnh    | 4.6      | Chuyên sửa máy lạnh, tủ lạnh.      |
| w3  | Vo Van F       | 0976543210    | Thợ mộc      | 4.7      | Nhận đóng sửa đồ gỗ tại nhà.       |

## � Ảnh minh họa

![Màn hình chào mừng](./App%20Welcome.jpg)

<!-- Thêm các ảnh chụp màn hình khác nếu có -->

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

## 📚 Tài liệu thêm

> Xem thêm: [docs/Troubleshooting.md](./docs/Troubleshooting.md)
> 
> Quay lại README tiếng Anh: [README.md](./README.md)

## Giấy phép

MIT License

---

> 🌐 Chuyển sang tiếng Anh: [README.md](./README.md)
