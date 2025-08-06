import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ServiceType } from '../types';
import { Colors } from '../Constants/colors';

interface ServiceCardProps {
  service: ServiceType;
  onPress: (service: ServiceType) => void;
  selected?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onPress,
  selected = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected && styles.selectedCard,
      ]}
      onPress={() => onPress(service)}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{service.icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.description}>{service.description}</Text>
        {/* Đã loại bỏ hiển thị giá vì không còn trường price */}
      </View>
      {selected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: Colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
