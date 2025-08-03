import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order, OrderFormData } from '../types';

interface OrderContextType {
  orders: Order[];
  addOrder: (orderData: OrderFormData) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  loading: boolean;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Load orders từ storage khi mount
  useEffect(() => {
    loadOrders();
    // Poll để kiểm tra orders mới mỗi 5 giây
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    try {
      const ordersJson = await AsyncStorage.getItem('orders');
      if (ordersJson) {
        setOrders(JSON.parse(ordersJson));
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveOrders = async (newOrders: Order[]) => {
    try {
      await AsyncStorage.setItem('orders', JSON.stringify(newOrders));
      setOrders(newOrders);
    } catch (error) {
      console.error('Error saving orders:', error);
      throw new Error('Không thể lưu đơn hàng');
    }
  };

  const addOrder = async (orderData: OrderFormData): Promise<string> => {
    const orderId = Math.random().toString(36).substring(7);
    const newOrder: Order = {
      id: orderId,
      ...orderData,
      status: 'pending',
      createdAt: new Date(),
    };
    
    await saveOrders([newOrder, ...orders]);
    return orderId;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    const newOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    await saveOrders(newOrders);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, loading }}>
      {children}
    </OrderContext.Provider>
  );
};
