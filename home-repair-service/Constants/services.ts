import { ServiceType } from '../types';

export const SERVICES: ServiceType[] = [
  {
    id: 'dien-nuoc',
    name: 'Sửa chữa điện nước',
    description: 'Sửa chữa, bảo trì hệ thống điện, ống nước, xử lý rò rỉ, thay thế và lắp đặt thiết bị điện nước...',
    icon: '💡',
    
  },
  {
    id: 'dien-lanh',
    name: 'Sửa chữa điện lạnh',
    description: 'Dịch vụ cho điều hòa, tủ lạnh, máy giặt, máy nước nóng và các thiết bị điện lạnh khác.',
    icon: '❄️',
    
  },
  {
    id: 'xay-dung-nha',
    name: 'Xây dựng & sửa chữa nhà cửa',
    description: 'Sửa chữa cải tạo, xây tường, chống thấm, sơn sửa trong ngoài nhà, chống dột mái nhà.',
    icon: '🏠',
    
  },
  {
    id: 'thiet-bi-gia-dung',
    name: 'Sửa chữa thiết bị gia dụng',
    description: 'Sửa chữa máy móc, đồ điện tử trong gia đình.',
    icon: '🔌',
    
  },
  {
    id: 'bao-tri',
    name: 'Dịch vụ bảo trì',
    description: 'Vệ sinh, kiểm tra và bảo dưỡng định kỳ các hệ thống như ống nước, điều hòa để duy trì trạng thái tốt cho thiết bị.',
    icon: '🛠️',
   
  },
  {
    id: 'khac',
    name: 'Dịch vụ khác',
    description: 'Các dịch vụ sửa chữa, bảo trì khác theo yêu cầu.',
    icon: '🔧',
  }
];
