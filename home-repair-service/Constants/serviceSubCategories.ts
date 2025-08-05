// Danh sách dịch vụ con cho từng dịch vụ chính
export interface ServiceSubCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export const SERVICE_SUB_CATEGORIES: Record<string, ServiceSubCategory[]> = {
  'dien-nuoc': [
    { id: 'sua-bong-den', name: 'Sửa bóng đèn / công tắc', description: 'Lỗi điện nhẹ trong nhà', icon: '💡' },
    { id: 'ro-ri-ong-nuoc', name: 'Sửa rò rỉ ống nước', description: 'Nước bị rò từ vòi, ống', icon: '🚰' },
    { id: 'thay-thiet-bi-dien-nuoc', name: 'Thay mới thiết bị điện nước', description: 'Thay lavabo, bồn cầu, sen tắm...', icon: '🚿' },
    { id: 'lap-thiet-bi-dien', name: 'Lắp đặt thiết bị điện mới', description: 'Quạt, đèn trần, ổ cắm...', icon: '🔌' },
    { id: 'sua-aptomat', name: 'Sửa aptomat / cầu dao', description: 'Sự cố rơle điện', icon: '⚡' },
    { id: 'chay-dien', name: 'Khắc phục chập cháy điện', description: 'Xử lý nhanh lỗi nguy hiểm', icon: '🔥' },
  ],
  'dien-lanh': [
    { id: 'sua-may-lanh', name: 'Sửa máy lạnh', description: 'Không lạnh, chảy nước, kêu to...', icon: '❄️' },
    { id: 'sua-may-giat', name: 'Sửa máy giặt', description: 'Không vắt, không xả nước', icon: '🧺' },
    { id: 'sua-tu-lanh', name: 'Sửa tủ lạnh', description: 'Không mát, ngăn đông hỏng', icon: '🧊' },
    { id: 'sua-may-nuoc-nong', name: 'Sửa máy nước nóng', description: 'Không lên nhiệt, rò điện', icon: '♨️' },
    { id: 've-sinh-dien-lanh', name: 'Vệ sinh thiết bị điện lạnh', description: 'Bảo trì định kỳ', icon: '🧹' },
  ],
  'xay-dung-nha': [
    { id: 'chong-tham', name: 'Chống thấm trần, tường', description: 'Nhà bị thấm, mốc', icon: '🧱' },
    { id: 'xay-sua-tuong', name: 'Xây sửa tường', description: 'Nứt tường, làm vách ngăn', icon: '🏗️' },
    { id: 'son-sua', name: 'Sơn sửa nội/ngoại thất', description: 'Sơn lại nhà cũ, sơn trần', icon: '🎨' },
    { id: 'chong-dot-mai', name: 'Chống dột mái', description: 'Lợp lại mái ngói/tôn', icon: '🏠' },
    { id: 'sua-nen-gach', name: 'Đục nền / sửa nền gạch', description: 'Gạch bong tróc, lún nền', icon: '🧱' },
  ],
  'thiet-bi-gia-dung': [
    { id: 'sua-quat', name: 'Sửa quạt điện', description: 'Không quay, kêu to', icon: '🌀' },
    { id: 'sua-noi-com', name: 'Sửa nồi cơm điện', description: 'Không nóng, lỗi mạch', icon: '🍚' },
    { id: 'sua-tv', name: 'Sửa TV', description: 'Không lên hình, mất tiếng', icon: '📺' },
    { id: 'sua-may-hut-bui', name: 'Sửa máy hút bụi', description: 'Không hút / kẹt motor', icon: '🧹' },
    { id: 'kiem-tra-tong-quat', name: 'Kiểm tra – đánh giá lỗi tổng quát', description: 'Nếu khách không rõ lỗi gì', icon: '🔍' },
  ],
  'bao-tri': [
    { id: 've-sinh-may-lanh', name: 'Vệ sinh máy lạnh định kỳ', description: 'Nên làm mỗi 6 tháng', icon: '🧽' },
    { id: 'kiem-tra-dien', name: 'Kiểm tra hệ thống điện tổng', description: 'Đo tải, phát hiện lỗi', icon: '🔎' },
    { id: 'bao-tri-ong-nuoc', name: 'Bảo trì ống nước', description: 'Tháo rửa, thông tắc nhẹ', icon: '🛁' },
    { id: 'lap-lich-bao-tri', name: 'Lập lịch bảo trì định kỳ', description: 'Hỗ trợ công ty, văn phòng', icon: '📅' },
  ],
  'khac': [
    { id: 'di-doi-thiet-bi', name: 'Di dời thiết bị', description: 'Dời máy lạnh, TV, máy giặt', icon: '🚚' },
    { id: 'tu-van-lap-dat', name: 'Tư vấn lắp đặt', description: 'Hỏi kỹ thuật trước khi mua', icon: '💬' },
    { id: 'kiem-tra-toan-dien', name: 'Kiểm tra toàn diện', description: 'Gói kiểm tra toàn nhà', icon: '🏡' },
    { id: 'khong-ro', name: 'Không rõ – nhờ kỹ thuật tư vấn', description: 'Khách không biết gọi dịch vụ gì', icon: '❓' },
  ],
};
