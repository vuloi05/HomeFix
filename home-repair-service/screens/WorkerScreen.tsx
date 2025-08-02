import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RoleScreenProps } from '../types';
import { Colors } from '../Constants/colors';

const WorkerScreen: React.FC<RoleScreenProps> = ({ role }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xin chào, Thợ sửa chữa!</Text>
      <Text style={styles.subtitle}>Bạn chỉ xem được các đơn được giao.</Text>
      {/* TODO: Hiển thị danh sách đơn được giao, cập nhật trạng thái */}
      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderText}>Chức năng đang phát triển...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  placeholderBox: {
    backgroundColor: Colors.border,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
});

export default WorkerScreen;