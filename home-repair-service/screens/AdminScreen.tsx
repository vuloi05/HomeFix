
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TextInput } from 'react-native';
import { RoleScreenProps, Order } from '../types';
import { Colors } from '../Constants/colors';
import { useOrders } from '../contexts/OrderContext';
import { CustomButton } from '../components/CustomButton';
import { OrderCard } from '../components/OrderCard';

const AdminScreen: React.FC<RoleScreenProps> = ({ role }) => {
  const { getOrdersByRole, updateOrderStatus } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState<Order['status'] | 'all'>('all');
  const [workerInput, setWorkerInput] = useState('');
  const [assigningOrderId, setAssigningOrderId] = useState<string | null>(null);
  const orders = getOrdersByRole('admin');

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
      `Khách hàng: ${order.customerName}\nSố điện thoại: ${order.phoneNumber}\nĐịa chỉ: ${order.address}\nDịch vụ: ${order.serviceType}\nThời gian yêu cầu: ${order.requestedTime}\nGhi chú: ${order.notes || 'Không có'}\nThợ được giao: ${order.assignedWorker || 'Chưa phân công'}`,
      [{ text: 'Đóng' }]
    );
  };

  const handleAssignWorker = async (orderId: string, workerId: string) => {
    // Giả lập cập nhật assignedWorker (bạn có thể mở rộng context để hỗ trợ cập nhật trường này)
    Alert.alert('Phân công thợ', `Đã phân công thợ ${workerId} cho đơn hàng ${orderId} (giả lập)`);
    setAssigningOrderId(null);
    setWorkerInput('');
  };

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý tất cả đơn hàng</Text>
      <View style={styles.filterContainer}>
        {['all', 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map(status => (
          <CustomButton
            key={status}
            title={status === 'all' ? 'Tất cả' : status}
            onPress={() => setSelectedStatus(status as Order['status'] | 'all')}
            variant={selectedStatus === status ? 'primary' : 'outline'}
            style={styles.filterButton}
          />
        ))}
      </View>
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <OrderCard
              order={item}
              onPress={() => handleOrderPress(item)}
              showActions={true}
              onStatusChange={handleStatusChange}
            />
            <View style={styles.assignContainer}>
              {assigningOrderId === item.id ? (
                <View style={styles.assignRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập mã thợ..."
                    value={workerInput}
                    onChangeText={setWorkerInput}
                  />
                  <CustomButton
                    title="Lưu"
                    onPress={() => handleAssignWorker(item.id, workerInput)}
                    style={styles.assignBtn}
                  />
                  <CustomButton
                    title="Hủy"
                    onPress={() => setAssigningOrderId(null)}
                    style={styles.assignBtn}
                    variant="outline"
                  />
                </View>
              ) : (
                <CustomButton
                  title={item.assignedWorker ? `Thợ: ${item.assignedWorker}` : 'Phân công thợ'}
                  onPress={() => setAssigningOrderId(item.id)}
                  style={styles.assignBtn}
                  variant={item.assignedWorker ? 'outline' : 'primary'}
                />
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có đơn hàng nào</Text>}
        contentContainerStyle={{ paddingBottom: 40 }}
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
    marginBottom: 8,
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
  orderItem: {
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  assignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  assignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 100,
    marginRight: 8,
    backgroundColor: Colors.surface,
  },
  assignBtn: {
    marginHorizontal: 4,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default AdminScreen;