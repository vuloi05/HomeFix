
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { RoleScreenProps, Order } from '../types';
import { Colors } from '../Constants/colors';
import { OrderCard } from '../components/OrderCard';
import { CustomButton } from '../components/CustomButton';
import { useOrders } from '../contexts/OrderContext';



const STATUS_OPTIONS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ nhận' },
  { key: 'confirmed', label: 'Đang đến' },
  { key: 'in-progress', label: 'Bắt đầu sửa' },
  { key: 'completed', label: 'Hoàn thành' },
];


const WorkerScreen: React.FC<RoleScreenProps> = () => {
  // Giả lập workerId cho thợ (có thể lấy từ context đăng nhập thực tế)
  const workerId = 'worker-demo';
  const { orders: allOrders, updateOrderStatus, saveOrders } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  // Thợ xem toàn bộ đơn, đơn mới nhất lên đầu
  const orders = [...allOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


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
      // Gán assignedWorker
      const newOrders = allOrders.map(o =>
        o.id === order.id ? { ...o, assignedWorker: workerId, status: 'confirmed' as Order['status'] } : o
      );
      await saveOrders(newOrders);
      Alert.alert('Thành công', 'Bạn đã nhận đơn thành công!');
    } catch {
      Alert.alert('Lỗi', 'Không thể nhận đơn!');
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

  const handleOrderPress = (order: Order) => {
    Alert.alert(
      'Chi tiết đơn hàng',
      `Khách hàng: ${order.customerName}\nSố điện thoại: ${order.phoneNumber}\nĐịa chỉ: ${order.address}\nDịch vụ: ${order.serviceType}\nThời gian yêu cầu: ${order.requestedTime}\nGhi chú: ${order.notes || 'Không có'}`,
      [{ text: 'Đóng' }]
    );
  };

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

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
          // Đơn chưa nhận: hiển thị nút Nhận đơn
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
          // Đơn đã nhận bởi thợ này: cho phép cập nhật trạng thái
          if (item.assignedWorker === workerId) {
            return (
              <OrderCard
                order={item}
                onPress={handleOrderPress}
                showActions={true}
                onStatusChange={handleStatusChange}
              />
            );
          }
          // Đơn đã có thợ khác nhận: chỉ xem
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