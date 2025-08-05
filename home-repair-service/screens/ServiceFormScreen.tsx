import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { CustomButton } from '../components/CustomButton';
// import { CustomInput } from '../components/CustomInput';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES } from '../Constants/services';
import { useOrderService } from '../services/orderService';
import { Colors } from '../Constants/colors';
import { ServiceType, OrderFormData, UserRole } from '../types';
import { ServiceSubCategory } from '../Constants/serviceSubCategories';

type ServiceFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ServiceForm'>;

interface ServiceFormScreenProps {
  navigation: ServiceFormScreenNavigationProp;
  role: UserRole;
}

import { useRoute } from '@react-navigation/native';

export const ServiceFormScreen: React.FC<ServiceFormScreenProps> = ({ navigation, role }) => {
  const route = useRoute();
  const { user, userType } = useUser();
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState<ServiceSubCategory[]>([]);

  // Nhận lại dịch vụ con đã chọn từ ServiceSubCategoryScreen
  React.useEffect(() => {
    // @ts-ignore
    if (route.params && route.params.selectedSubCategories) {
      // @ts-ignore
      setSelectedSubCategories(route.params.selectedSubCategories);
    }
    // @ts-ignore
    if (route.params && route.params.parentId) {
      // @ts-ignore
      const service = SERVICES.find(s => s.id === route.params.parentId);
      if (service) setSelectedService(service);
    }
  }, [route.params]);
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: user?.name || '',
    phoneNumber: user?.phone || '',
    address: user?.address || '',
    serviceType: '',
    requestedTime: '',
    notes: '',
  });

  // Nếu user đổi, tự động cập nhật form
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      customerName: user?.name || '',
      phoneNumber: user?.phone || '',
      address: user?.address || '',
    }));
  }, [user]);
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


  // Khi chọn dịch vụ chính, chuyển sang màn chọn dịch vụ con
  const handleServiceSelect = (service: ServiceType) => {
    navigation.navigate('ServiceSubCategory', {
      parentId: service.id,
      parentName: service.name,
      selected: selectedSubCategories.map(sub => sub.id),
    });
  };

  const { createOrder } = useOrderService();

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Lấy userId thực tế từ context
      const userId = user?.id || 'customer-demo';
      const orderId = await createOrder(formData, userId);
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
              onPress={() => handleServiceSelect(service)}
              selected={selectedService?.id === service.id}
            />
          ))}
          {selectedService && selectedSubCategories.length > 0 && (
            <View style={{ marginTop: 10, padding: 10, backgroundColor: '#f0f8ff', borderRadius: 8 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Dịch vụ chi tiết đã chọn:</Text>
              {selectedSubCategories.map(sub => (
                <Text key={sub.id} style={{ marginLeft: 8 }}>• {sub.name}</Text>
              ))}
            </View>
          )}
        </View>


        {/* Nút Tiếp tục đã bị loại bỏ, chỉ còn chọn dịch vụ và chuyển sang màn hình dịch vụ chi tiết */}

        {/* Submit Button đã loại bỏ, chỉ còn nút Tiếp tục */}
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
