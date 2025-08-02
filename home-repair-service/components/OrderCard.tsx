import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Order } from '../types';
import { Colors } from '../Constants/colors';

interface OrderCardProps {
  order: Order;
  onPress?: (order: Order) => void;
  showActions?: boolean;
  onStatusChange?: (orderId: string, newStatus: Order['status']) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onPress,
  showActions = false,
  onStatusChange,
}) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return Colors.pending;
      case 'confirmed':
        return Colors.confirmed;
      case 'in-progress':
        return Colors.inProgress;
      case 'completed':
        return Colors.completed;
      case 'cancelled':
        return Colors.cancelled;
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Chờ xác nhận';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'in-progress':
        return 'Đang thực hiện';
      case 'completed':
        return 'Hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(order)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.orderId}>Đơn hàng #{order.id.slice(-6)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Khách hàng:</Text>
          <Text style={styles.value}>{order.customerName}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <Text style={styles.value}>{order.phoneNumber}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Địa chỉ:</Text>
          <Text style={styles.value}>{order.address}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Dịch vụ:</Text>
          <Text style={styles.value}>{order.serviceType}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Thời gian yêu cầu:</Text>
          <Text style={styles.value}>{order.requestedTime}</Text>
        </View>
        
        {order.notes && (
          <View style={styles.row}>
            <Text style={styles.label}>Ghi chú:</Text>
            <Text style={styles.value}>{order.notes}</Text>
          </View>
        )}
        
        <View style={styles.row}>
          <Text style={styles.label}>Ngày tạo:</Text>
          <Text style={styles.value}>{formatDate(order.createdAt)}</Text>
        </View>
      </View>

      {showActions && onStatusChange && (
        <View style={styles.actions}>
          {order.status === 'pending' && (
            <>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: Colors.success }]}
                onPress={() => onStatusChange(order.id, 'confirmed')}
              >
                <Text style={styles.actionButtonText}>Xác nhận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: Colors.error }]}
                onPress={() => onStatusChange(order.id, 'cancelled')}
              >
                <Text style={styles.actionButtonText}>Từ chối</Text>
              </TouchableOpacity>
            </>
          )}
          {order.status === 'confirmed' && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: Colors.info }]}
              onPress={() => onStatusChange(order.id, 'in-progress')}
            >
              <Text style={styles.actionButtonText}>Bắt đầu</Text>
            </TouchableOpacity>
          )}
          {order.status === 'in-progress' && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: Colors.success }]}
              onPress={() => onStatusChange(order.id, 'completed')}
            >
              <Text style={styles.actionButtonText}>Hoàn thành</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    width: 120,
  },
  value: {
    fontSize: 14,
    color: Colors.textPrimary,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  actionButtonText: {
    color: Colors.textLight,
    fontSize: 12,
    fontWeight: '600',
  },
});
