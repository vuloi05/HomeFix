export interface ServiceType {
  id: string;
  name: string;
  description: string;
  icon: string;
  price?: string;
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
}

export interface OrderFormData {
  customerName: string;
  phoneNumber: string;
  address: string;
  serviceType: string;
  requestedTime: string;
  notes?: string;
}

export type RootStackParamList = {
  Welcome: undefined;
  ServiceForm: undefined;
  Confirmation: { orderId: string };
  OrderList: undefined;
}; 