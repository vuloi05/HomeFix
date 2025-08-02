import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Order, OrderFormData } from '../types';

const ORDERS_COLLECTION = 'orders';

export const orderService = {
  // Tạo đơn hàng mới
  async createOrder(orderData: OrderFormData): Promise<string> {
    try {
      const orderToSave = {
        ...orderData,
        status: 'pending' as const,
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderToSave);
      return docRef.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Không thể tạo đơn hàng. Vui lòng thử lại.');
    }
  },

  // Lấy tất cả đơn hàng
  async getAllOrders(): Promise<Order[]> {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const orders: Order[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          id: doc.id,
          customerName: data.customerName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          serviceType: data.serviceType,
          requestedTime: data.requestedTime,
          status: data.status,
          createdAt: data.createdAt.toDate(),
          notes: data.notes,
        });
      });
      
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Không thể tải danh sách đơn hàng.');
    }
  },

  // Lấy đơn hàng theo trạng thái
  async getOrdersByStatus(status: Order['status']): Promise<Order[]> {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const orders: Order[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          id: doc.id,
          customerName: data.customerName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          serviceType: data.serviceType,
          requestedTime: data.requestedTime,
          status: data.status,
          createdAt: data.createdAt.toDate(),
          notes: data.notes,
        });
      });
      
      return orders;
    } catch (error) {
      console.error('Error fetching orders by status:', error);
      throw new Error('Không thể tải danh sách đơn hàng.');
    }
  },

  // Cập nhật trạng thái đơn hàng
  async updateOrderStatus(orderId: string, newStatus: Order['status']): Promise<void> {
    try {
      const orderRef = doc(db, ORDERS_COLLECTION, orderId);
      await updateDoc(orderRef, {
        status: newStatus,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Không thể cập nhật trạng thái đơn hàng.');
    }
  },

  // Lấy đơn hàng theo ID
  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const orderRef = doc(db, ORDERS_COLLECTION, orderId);
      const orderDoc = await getDocs(query(collection(db, ORDERS_COLLECTION), where('__name__', '==', orderId)));
      
      if (orderDoc.empty) {
        return null;
      }
      
      const data = orderDoc.docs[0].data();
      return {
        id: orderDoc.docs[0].id,
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        serviceType: data.serviceType,
        requestedTime: data.requestedTime,
        status: data.status,
        createdAt: data.createdAt.toDate(),
        notes: data.notes,
      };
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      throw new Error('Không thể tải thông tin đơn hàng.');
    }
  },
};
