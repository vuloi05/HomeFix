import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { CustomButton } from '../components/CustomButton';
import { OrderCard } from '../components/OrderCard';
import { orderService } from '../services/orderService';
import { Colors } from '../Constants/colors';
import { Order, UserRole } from '../types';

type OrderListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OrderList'>;

interface OrderListScreenProps {
  navigation: OrderListScreenNavigationProp;
  role: UserRole;
}

export const OrderListScreen: React.FC<OrderListScreenProps> = ({ navigation, role }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Order['status'] | 'all'>('all');

  const loadOrders = async () => {
    try {
      setLoading(true);
      const allOrders = await orderService.getAllOrders();
      setOrders(allOrders);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      // Reload orders after status change
      await loadOrders();
      Alert.alert('Thành công', 'Đã cập nhật trạng thái đơn hàng');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật trạng thái đơn hàng');
    }
  };

  const handleOrderPress = (order: Order) => {
    Alert.alert(
      'Chi tiết đơn hàng',
      `Khách hàng: ${order.customerName}\nSố điện thoại: ${order.phoneNumber}\nĐịa chỉ: ${order.address}\nDịch vụ: ${order.serviceType}\nThời gian yêu cầu: ${order.requestedTime}\nGhi chú: ${order.notes || 'Không có'}`,
      [{ text: 'Đóng' }]
    );
  };

  const getFilteredOrders = () => {
    if (selectedStatus === 'all') {
      return orders;
    }
    return orders.filter(order => order.status === selectedStatus);
  };

  const getStatusCount = (status: Order['status']) => {
    return orders.filter(order => order.status === status).length;
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const renderStatusFilter = () => (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>Lọc theo trạng thái:</Text>
      <View style={styles.filterButtons}>
        <CustomButton
          title={`Tất cả (${orders.length})`}
          onPress={() => setSelectedStatus('all')}
          variant={selectedStatus === 'all' ? 'primary' : 'outline'}
          style={styles.filterButton}
        />
        <CustomButton
          title={`Chờ xác nhận (${getStatusCount('pending')})`}
          onPress={() => setSelectedStatus('pending')}
          variant={selectedStatus === 'pending' ? 'primary' : 'outline'}
          style={styles.filterButton}
        />
        <CustomButton
          title={`Đang thực hiện (${getStatusCount('in-progress')})`}
          onPress={() => setSelectedStatus('in-progress')}
          variant={selectedStatus === 'in-progress' ? 'primary' : 'outline'}
          style={styles.filterButton}
        />
        <CustomButton
          title={`Hoàn thành (${getStatusCount('completed')})`}
          onPress={() => setSelectedStatus('completed')}
          variant={selectedStatus === 'completed' ? 'primary' : 'outline'}
          style={styles.filterButton}
        />
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyTitle}>Không có đơn hàng nào</Text>
      <Text style={styles.emptyText}>
        {selectedStatus === 'all' 
          ? 'Chưa có đơn hàng nào được tạo'
          : `Không có đơn hàng nào ở trạng thái "${selectedStatus}"`
        }
      </Text>
    </View>
  );

  const filteredOrders = getFilteredOrders();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quản lý đơn hàng</Text>
        <CustomButton
          title="Làm mới"
          onPress={handleRefresh}
          variant="outline"
          style={styles.refreshButton}
        />
      </View>

      {renderStatusFilter()}

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPress={handleOrderPress}
            showActions={true}
            onStatusChange={handleStatusChange}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
          />
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  refreshButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
