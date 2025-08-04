
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { RoleScreenProps, Order } from '../types';
import { Colors } from '../Constants/colors';
import { OrderCard } from '../components/OrderCard';
import { OrderDetailModal } from '../components/OrderDetailModal';
import { CustomButton } from '../components/CustomButton';
import { useOrders } from '../contexts/OrderContext';
import { useUser } from '../contexts/UserContext';

const STATUS_OPTIONS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ nhận' },
  { key: 'confirmed', label: 'Đang đến' },
  { key: 'in-progress', label: 'Bắt đầu sửa' },
  { key: 'completed', label: 'Hoàn thành' },
];

const WorkerScreen: React.FC<RoleScreenProps> = () => {
  const { user } = useUser();
  const workerId = user?.id;
  const { getOrdersByRole, updateOrderStatus, saveOrders, orders: allOrders } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  // Lấy đúng danh sách đơn cho thợ: đơn chưa ai nhận hoặc đơn của chính mình
  const orders = getOrdersByRole('worker', undefined, workerId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


  // Nhận đơn: kiểm tra race condition
  const handleAssignOrder = async (order: Order) => {
    if (order.assignedWorker && order.assignedWorker !== workerId) {
      Alert.alert('Đơn đã có thợ nhận!');
      return;
    }
    try {
      // Reload đơn mới nhất trước khi nhận
      const latestOrder = allOrders.find(o => o.id === order.id);
      if (latestOrder?.assignedWorker) {
        Alert.alert('Đơn đã có thợ nhận!');
        return;
      }
      // Gán assignedWorker, cập nhật trạng thái, đẩy lên đầu danh sách
      const newOrder = { ...order, assignedWorker: workerId, status: 'confirmed' as Order['status'], createdAt: new Date() };
      const newOrders = [newOrder, ...allOrders.filter(o => o.id !== order.id)];
      await saveOrders(newOrders);
      Alert.alert('Thành công', 'Bạn đã nhận đơn thành công!');
      setTimeout(() => {
        Alert.alert('Thông báo cho khách', 'Đơn đã được nhận, thợ sẽ đến trong vòng 10 phút.');
      }, 500);
  // Thợ hủy nhận đơn: gỡ assignedWorker, trạng thái về pending, đẩy lên đầu danh sách
  const handleUnassignOrder = async (order: Order) => {
    if (order.assignedWorker !== workerId) return;
    try {
      const newOrder = { ...order, assignedWorker: undefined, status: 'pending' as Order['status'], createdAt: new Date() };
      const newOrders = [newOrder, ...allOrders.filter(o => o.id !== order.id)];
      await saveOrders(newOrders);
      Alert.alert('Đã hủy nhận đơn', 'Đơn đã quay lại danh sách chờ.');
    } catch {
      Alert.alert('Lỗi', 'Không thể hủy nhận đơn!');
    }
  };
    } catch {
      Alert.alert('Lỗi', 'Không thể nhận đơn!');
    }
  };


  // Thợ hủy nhận đơn: gỡ assignedWorker, trạng thái về pending, đẩy lên đầu danh sách
  const handleUnassignOrder = async (order: Order) => {
    if (order.assignedWorker !== workerId) return;
    try {
      const newOrder = { ...order, assignedWorker: undefined, status: 'pending' as Order['status'], createdAt: new Date() };
      const newOrders = [newOrder, ...allOrders.filter(o => o.id !== order.id)];
      await saveOrders(newOrders);
      Alert.alert('Đã hủy nhận đơn', 'Đơn đã quay lại danh sách chờ.');
    } catch {
      Alert.alert('Lỗi', 'Không thể hủy nhận đơn!');
    }
  };

  // Chỉ thợ nhận mới được cập nhật trạng thái
  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    const order = allOrders.find(o => o.id === orderId);
    if (!order) return;
    if (order.assignedWorker !== workerId) {
      Alert.alert('Bạn không có quyền cập nhật đơn này!');
      return;
    }
    try {
      await updateOrderStatus(orderId, newStatus);
      Alert.alert('Thành công', 'Đã cập nhật trạng thái đơn hàng!');
    } catch {
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái đơn hàng!');
    }
  };

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const handleOrderPress = (order: Order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  // Chỉ hiển thị đơn chưa nhận hoặc đơn do thợ này nhận
  const filteredOrders = selectedStatus === 'all'
    ? orders.filter(order => !order.assignedWorker || order.assignedWorker === workerId)
    : orders.filter(order => (!order.assignedWorker || order.assignedWorker === workerId) && order.status === selectedStatus);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xin chào, Thợ sửa chữa!</Text>
      <Text style={styles.subtitle}>Bạn có thể xem, nhận và cập nhật trạng thái các đơn phù hợp</Text>

      {/* Bộ lọc trạng thái */}
      <View style={styles.filterContainer}>
        {STATUS_OPTIONS.map(opt => (
          <CustomButton
            key={opt.key}
            title={opt.label}
            onPress={() => setSelectedStatus(opt.key)}
            variant={selectedStatus === opt.key ? 'primary' : 'outline'}
            style={styles.filterButton}
          />
        ))}
      </View>

      {/* Danh sách đơn */}
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          if (!item.assignedWorker) {
            return (
              <OrderCard
                order={item}
                onPress={handleOrderPress}
                showActions={false}
              >
                <CustomButton
                  title="Nhận đơn"
                  onPress={() => handleAssignOrder(item)}
                  style={{ marginTop: 8 }}
                />
              </OrderCard>
            );
          }
          if (item.assignedWorker === workerId) {
            return (
              <OrderCard
                order={item}
                onPress={handleOrderPress}
                showActions={true}
                onStatusChange={handleStatusChange}
              >
                <CustomButton
                  title="Hủy nhận đơn"
                  onPress={() => handleUnassignOrder(item)}
                  style={{ marginTop: 8, backgroundColor: Colors.cancelled }}
                />
              </OrderCard>
            );
          }
          return (
            <OrderCard
              order={item}
              onPress={handleOrderPress}
              showActions={false}
            />
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>Không có đơn hàng nào phù hợp</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
      />
      <OrderDetailModal
        visible={showDetail}
        onClose={() => setShowDetail(false)}
        order={selectedOrder}
        role={'worker'}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 24,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  filterButton: {
    marginHorizontal: 4,
    marginVertical: 4,
    minWidth: 90,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});

export default WorkerScreen;