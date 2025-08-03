import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES } from '../Constants/services';
import { useOrderService } from '../services/orderService';
import { Colors } from '../Constants/colors';
import { ServiceType, OrderFormData, UserRole } from '../types';

type ServiceFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ServiceForm'>;

interface ServiceFormScreenProps {
  navigation: ServiceFormScreenNavigationProp;
  role: UserRole;
}

export const ServiceFormScreen: React.FC<ServiceFormScreenProps> = ({ navigation, role }) => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    phoneNumber: '',
    address: '',
    serviceType: '',
    requestedTime: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<OrderFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderFormData> = {};

    if (!selectedService) {
      Alert.alert('Lỗi', 'Vui lòng chọn loại dịch vụ');
      return false;
    }

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Vui lòng nhập tên khách hàng';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }

    if (!formData.requestedTime.trim()) {
      newErrors.requestedTime = 'Vui lòng nhập thời gian yêu cầu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, serviceType: service.name }));
  };

  const { createOrder } = useOrderService();

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const orderId = await createOrder(formData);
      navigation.navigate('Confirmation', { orderId });
    } catch (error) {
      Alert.alert('Lỗi', error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Đặt dịch vụ sửa chữa</Text>
        <Text style={styles.subtitle}>Chọn dịch vụ bạn cần</Text>

        {/* Service Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loại dịch vụ</Text>
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={handleServiceSelect}
              selected={selectedService?.id === service.id}
            />
          ))}
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          
          <CustomInput
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            value={formData.customerName}
            onChangeText={(text) => handleInputChange('customerName', text)}
            error={errors.customerName}
          />

          <CustomInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={formData.phoneNumber}
            onChangeText={(text) => handleInputChange('phoneNumber', text)}
            error={errors.phoneNumber}
            keyboardType="phone-pad"
          />

          <CustomInput
            label="Địa chỉ"
            placeholder="Nhập địa chỉ chi tiết"
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            error={errors.address}
            multiline
            numberOfLines={3}
          />

          <CustomInput
            label="Thời gian yêu cầu"
            placeholder="VD: Sáng mai, Chiều nay, Tối thứ 7..."
            value={formData.requestedTime}
            onChangeText={(text) => handleInputChange('requestedTime', text)}
            error={errors.requestedTime}
          />

          <CustomInput
            label="Ghi chú (tùy chọn)"
            placeholder="Mô tả chi tiết vấn đề cần sửa chữa"
            value={formData.notes ?? ''}
            onChangeText={(text) => handleInputChange('notes', text)}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title={isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
            onPress={handleSubmit}
            disabled={isLoading}
            style={styles.submitButton}
          />
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Đang gửi yêu cầu...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  submitButton: {
    backgroundColor: Colors.primary,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.textLight,
    fontSize: 16,
    marginTop: 16,
  },
});
