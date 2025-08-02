import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RoleScreenProps } from '../types';
import { Colors } from '../Constants/colors';

const AdminScreen: React.FC<RoleScreenProps> = ({ role }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xin chào, Admin!</Text>
      <Text style={styles.subtitle}>Bạn có toàn quyền quản lý hệ thống.</Text>
      {/* TODO: Quản lý user/thợ, dịch vụ, phân công thợ, thống kê */}
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

export default AdminScreen;