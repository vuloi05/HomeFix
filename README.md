
# HomeFix - Ứng dụng dịch vụ sửa chữa tại nhà

HomeFix là ứng dụng React Native (Expo) mô phỏng quy trình đặt và quản lý dịch vụ sửa chữa tại nhà. Dự án tập trung vào trải nghiệm người dùng, kiến trúc code rõ ràng, dễ mở rộng, phù hợp cho học tập, demo hoặc làm nền tảng phát triển thực tế.

## Tính năng nổi bật

### Khách hàng
- Đặt dịch vụ sửa chữa qua form, chọn loại dịch vụ, nhập thông tin cá nhân
- Xem xác nhận đơn hàng sau khi đặt thành công
- Quản lý đơn hàng đã đặt qua tab "Quản lý đơn hàng"
- Giao diện hiện đại, thân thiện, tối ưu cho mobile
- Điều hướng mượt mà bằng Bottom Tab ("Đặt dịch vụ" & "Quản lý đơn hàng")

### Thợ / Admin
- Xem, lọc, cập nhật trạng thái đơn hàng
- Xem chi tiết đơn hàng
- (Admin) Quản lý toàn bộ hệ thống (chức năng nâng cao đang phát triển)

### Kiến trúc & Công nghệ
- React Native (Expo) + TypeScript
- Quản lý state nội bộ (Context API, AsyncStorage)
- Không phụ thuộc backend thực tế (dễ tích hợp REST API/GraphQL về sau)
- React Navigation v6 (Stack + Bottom Tab)
- UI component tuỳ biến, dễ mở rộng

## Cài đặt & chạy thử

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

## Cài đặt

### 1. Clone repository
```bash
git clone <repository-url>
cd home-repair-service
```

### 2. Cài đặt dependencies
```bash
npm install
```




### 3. Chạy ứng dụng

```bash
# Chạy trên Android
npm run android

# Chạy trên iOS (cần macOS)
npm run ios

# Chạy trên web
npm run web
```


## Cấu trúc thư mục

```
home-repair-service/
├── components/          # Reusable components
│   ├── CustomButton.tsx
│   ├── CustomInput.tsx
│   ├── ServiceCard.tsx
│   └── OrderCard.tsx
├── screens/            # App screens
│   ├── WelcomeScreen.tsx
│   ├── ServiceFormScreen.tsx
│   ├── ConfirmationScreen.tsx
│   └── OrderListScreen.tsx
├── services/           # API services
│   ├── firebase.ts
│   └── orderService.ts
├── Constants/          # App constants
│   ├── colors.ts
│   ├── services.ts
│   └── styles.ts
├── types/              # TypeScript types
│   └── index.ts
├── Navigation/         # Navigation setup
│   └── AppNavigator.tsx
└── App.tsx            # Main app component
```


## Luồng sử dụng

### Khách hàng
1. Mở app, chọn vai trò "Khách hàng"
2. Đặt dịch vụ qua tab "Đặt dịch vụ"
3. Sau khi đặt thành công, xem xác nhận và mã đơn hàng
4. Quản lý các đơn đã đặt qua tab "Quản lý đơn hàng"

### Thợ / Admin
1. Mở app, chọn vai trò "Thợ" hoặc "Admin"
2. Xem, lọc, cập nhật trạng thái đơn hàng
3. (Admin) Quản lý hệ thống (đang phát triển)



## Định hướng mở rộng

- [ ] Kết nối backend thực tế (REST API, GraphQL, ...)
- [ ] Đăng nhập/đăng ký (Authentication)
- [ ] Push notification
- [ ] Thanh toán online
- [ ] Chat real-time
- [ ] Đánh giá, review dịch vụ
- [ ] Định vị, bản đồ
- [ ] Upload ảnh vấn đề cần sửa


## Hướng dẫn phát triển & đóng góp

- Code style: TypeScript, function component, hooks, Context API
- Đặt tên biến, hàm rõ ràng, ưu tiên tiếng Anh cho code, tiếng Việt cho UI
- Tách biệt logic, UI, state, dễ test và mở rộng
- Đóng góp: fork, tạo pull request, mô tả rõ thay đổi

## Troubleshooting

### Lỗi Navigation
- Đảm bảo đã cài đặt đầy đủ dependencies navigation
- Kiểm tra TypeScript types trong `types/index.ts`
- Nếu gặp lỗi điều hướng khi dùng Bottom Tab, kiểm tra tên screen và cấu trúc navigator lồng nhau

### Lỗi AsyncStorage
- Nếu đơn hàng không lưu lại, kiểm tra quyền bộ nhớ và trạng thái AsyncStorage

### Lỗi build Expo
- Đảm bảo đúng version React Native, Expo, dependencies như trong package.json

## License

MIT License