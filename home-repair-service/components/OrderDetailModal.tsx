import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { Order } from '../types';
import { Colors } from '../Constants/colors';
import { UserType, UserInfo } from '../contexts/UserContext';

interface OrderDetailModalProps {
  visible: boolean;
  onClose: () => void;
  order: Order | null;
  role: UserType;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ visible, onClose, order, role }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [worker, setWorker] = useState<UserInfo | null>(null);
  const [customer, setCustomer] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!order) return;
    // Load thông tin thợ nếu có
    if (order.assignedWorker) {
      import('../mock-data/mockWorkers.json').then(data => {
        const found = (data.default || data).find((w: any) => w.id === order.assignedWorker);
        setWorker(found || null);
      });
    } else {
      setWorker(null);
    }
    // Load thông tin khách hàng
    if (order.userId) {
      import('../mock-data/mockCustomers.json').then(data => {
        const found = (data.default || data).find((c: any) => c.id === order.userId);
        setCustomer(found || null);
      });
    } else {
      setCustomer(null);
    }
  }, [order]);

  if (!order) return null;

  // Xác định điều kiện hiển thị nút Chat
  const canChat = order.assignedWorker && ((role === 'customer' && worker) || (role === 'worker' && customer));
  // Lấy tên đối phương
  const partnerName = role === 'customer' ? worker?.name : customer?.name;

  const handleChat = () => {
    navigation.navigate('Chat', {
      orderId: order.id,
      partnerName: partnerName || 'Đối tác',
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView>
            <Text style={styles.title}>Chi tiết đơn hàng</Text>
            <Text style={styles.label}>Trạng thái: <Text style={styles.value}>{order.status}</Text></Text>
            <Text style={styles.label}>Dịch vụ: <Text style={styles.value}>{order.serviceType}</Text></Text>
            <Text style={styles.label}>Thời gian yêu cầu: <Text style={styles.value}>{order.requestedTime}</Text></Text>
            <Text style={styles.label}>Ghi chú: <Text style={styles.value}>{order.notes || 'Không có'}</Text></Text>
            <Text style={styles.label}>Ngày tạo: <Text style={styles.value}>{new Date(order.createdAt).toLocaleString('vi-VN')}</Text></Text>

            {/* Thông tin đối phương */}
            {role === 'customer' && worker && (
              <View style={styles.userBox}>
                <Text style={styles.sectionTitle}>Thông tin thợ</Text>
                <View style={styles.userRow}>
                  <Image source={{ uri: worker.avatar }} style={styles.avatar} />
                  <View>
                    <Text style={styles.userName}>{worker.name}</Text>
                    <Text style={styles.userInfo}>SĐT: {worker.phone}</Text>
                    <Text style={styles.userInfo}>Chuyên môn: {worker.specialty}</Text>
                    <Text style={styles.userInfo}>Đánh giá: {worker.rating || 'N/A'}</Text>
                    <Text style={styles.userInfo}>{worker.note}</Text>
                  </View>
                </View>
              </View>
            )}
            {role === 'worker' && customer && (
              <View style={styles.userBox}>
                <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
                <View style={styles.userRow}>
                  <Image source={{ uri: customer.avatar }} style={styles.avatar} />
                  <View>
                    <Text style={styles.userName}>{customer.name}</Text>
                    <Text style={styles.userInfo}>SĐT: {customer.phone}</Text>
                    <Text style={styles.userInfo}>Địa chỉ: {customer.address}</Text>
                    <Text style={styles.userInfo}>{customer.note}</Text>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
          {canChat && (
            <TouchableOpacity style={styles.chatBtn} onPress={handleChat}>
              <Text style={styles.chatText}>Chat</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
// ...existing code...
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: 340,
    maxHeight: '85%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 6,
  },
  value: {
    fontWeight: '400',
    color: Colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 6,
  },
  userBox: {
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  userInfo: {
    fontSize: 13,
    color: '#555',
  },
  chatBtn: {
    marginTop: 18,
    alignSelf: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  chatText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  closeBtn: {
    marginTop: 18,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 28,
    paddingVertical: 10,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
