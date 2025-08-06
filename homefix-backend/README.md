# HomeFix Backend Chat API

## Cài đặt

1. Cài Node.js, MongoDB (local hoặc cloud)
2. Cài dependencies:
   ```
   npm install
   ```
3. Tạo file `.env` (đã có mẫu)
4. Chạy server:
   ```
   npm start
   ```

## API chính
- Đăng ký: `POST /api/auth/register`
- Đăng nhập: `POST /api/auth/login`
- Lấy thông tin user: `GET /api/auth/me`
- Lấy danh sách chat: `GET /api/chat/`
- Lấy chat theo order: `GET /api/chat/:orderId`

## Socket.io
- `join` (orderId, userId): vào phòng chat đơn hàng
- `message` (orderId, senderId, type, content): gửi tin nhắn
- `typing` (orderId, userId): trạng thái đang nhập
- `read` (orderId, userId): đánh dấu đã đọc
- `online` (userId): trạng thái online

## Ghi chú
- Chỉ khách/thợ của đơn hàng mới chat được
- Admin có thể join mọi phòng
- Ảnh gửi qua chat: cần bổ sung API upload ảnh nếu muốn gửi file
