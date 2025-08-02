
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { RoleScreenProps, Order } from '../types';
import { Colors } from '../Constants/colors';
import { OrderCard } from '../components/OrderCard';
import { CustomButton } from '../components/CustomButton';

// Dữ liệu mẫu cho thợ test
const MOCK_ORDERS: Order[] = [
  {
    id: 'order001',
    customerName: 'Nguyễn Văn A',
    phoneNumber: '0901234567',
    address: '123 Lê Lợi, Q.1, TP.HCM',
    serviceType: 'Sửa điện',
    requestedTime: '2025-08-03 09:00',
    status: 'pending',
    createdAt: new Date(),
    notes: 'Kiểm tra ổ cắm bị hỏng',
  },
  {
    id: 'order002',
    customerName: 'Trần Thị B',
    phoneNumber: '0912345678',
    address: '456 Nguyễn Trãi, Q.5, TP.HCM',
    serviceType: 'Sửa nước',
    requestedTime: '2025-08-03 14:00',
    status: 'confirmed',
    createdAt: new Date(),
    notes: '',
  },
  {
    id: 'order003',
    customerName: 'Lê Văn C',
    phoneNumber: '0987654321',
    address: '789 Cách Mạng Tháng 8, Q.10, TP.HCM',
    serviceType: 'Sửa máy lạnh',
    requestedTime: '2025-08-02 16:00',
    status: 'in-progress',
    createdAt: new Date(),
    notes: 'Máy lạnh không lạnh',
  },
  {
    id: 'order004',
    customerName: 'Phạm Thị D',
    phoneNumber: '0978123456',
    address: '12 Võ Thị Sáu, Q.3, TP.HCM',
    serviceType: 'Sửa điện',
    requestedTime: '2025-08-01 10:00',
    status: 'completed',
    createdAt: new Date(),
    notes: '',
  },
];

const STATUS_OPTIONS = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ nhận' },
  { key: 'confirmed', label: 'Đang đến' },
  { key: 'in-progress', label: 'Bắt đầu sửa' },
  { key: 'completed', label: 'Hoàn thành' },
];

const WorkerScreen: React.FC<RoleScreenProps> = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    Alert.alert('Thành công', 'Đã cập nhật trạng thái đơn hàng!');
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