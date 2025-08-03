import { useOrders } from '../contexts/OrderContext';
import { OrderFormData } from '../types';

export const useOrderService = () => {
  const { addOrder, updateOrderStatus, orders, loading } = useOrders();

  return {
    createOrder: addOrder,
    updateOrderStatus,
    getOrders: () => orders,
    isLoading: loading
  };
};

