
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { RoleScreenProps, Order } from '../types';
import { Colors } from '../Constants/colors';
import { OrderCard } from '../components/OrderCard';
import { CustomButton } from '../components/CustomButton';
import { useOrderService } from '../services/orderService';



const STATUS_OPTIONS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ nhận' },
  { key: 'confirmed', label: 'Đang đến' },
  { key: 'in-progress', label: 'Bắt đầu sửa' },
  { key: 'completed', label: 'Hoàn thành' },
];


const WorkerScreen: React.FC<RoleScreenProps> = () => {
  const { getOrders, updateOrderStatus } = useOrderService();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const orders = getOrders();

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
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
      <Text style={styles.subtitle}>Danh sách đơn được giao cho bạn</Text>

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
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={handleOrderPress}
            showActions={true}
            onStatusChange={handleStatusChange}
          />
        )}
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