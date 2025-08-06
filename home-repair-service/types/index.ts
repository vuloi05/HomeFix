
import { ServiceSubCategory } from '../Constants/serviceSubCategories';
export interface OrderFormData {
  customerName: string;
  phoneNumber: string;
  address: string;
  serviceType: string;
  requestedTime: string;
  notes?: string;
  subServices?: { id: string; name: string }[];
}
export interface ServiceType {
  id: string;
  name: string;
  description: string;
  icon: string;
  // price?: string; // Đã loại bỏ trường price
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  serviceType: string;
  requestedTime: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  notes?: string;
  userId: string; // id/email/sdt khách hàng
  assignedWorker?: string; // id/thông tin thợ được giao
  subServices?: { id: string; name: string }[];
}


export type RootStackParamList = {
  Welcome: undefined;
  ServiceForm: undefined;
  Confirmation: { orderId: string };
  OrderList: undefined;
  Worker: undefined;
  Admin: undefined;
  CustomerTab: { screen?: 'ServiceForm' | 'OrderList' } | undefined;
  ServiceSubCategory: { parentId: string; parentName: string; selected: string[] };
  CustomerInfo: { selectedService: ServiceType; selectedSubCategories: any[] };
  Chat: { orderId: string; partnerName: string };
};

export type UserRole = 'customer' | 'worker' | 'admin' | null;

export interface RoleScreenProps {
  role: UserRole;
  onSwitchRole?: (role: UserRole) => void;
} 