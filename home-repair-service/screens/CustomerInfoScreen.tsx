import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { Colors } from '../Constants/colors';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useOrderService } from '../services/orderService';
import { useUser } from '../contexts/UserContext';
const CustomerInfoScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute<RouteProp<RootStackParamList, 'CustomerInfo'>>();
  const { selectedService, selectedSubCategories } = route.params;
  const { user } = useUser();
  const [form, setForm] = useState({
    customerName: user?.name || '',
    phoneNumber: user?.phone || '',
    address: user?.address || '',
    requestedTime: '',
    notes: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const { createOrder } = useOrderService();

  const handleInputChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev: any) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: any = {};
    if (!form.customerName.trim()) newErrors.customerName = 'Vui lòng nhập tên khách hàng';
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    else if (!/^[0-9]{10,11}$/.test(form.phoneNumber.trim())) newErrors.phoneNumber = 'Số điện thoại không hợp lệ';
    if (!form.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!form.requestedTime.trim()) newErrors.requestedTime = 'Vui lòng nhập thời gian yêu cầu';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      // Gửi đơn hàng với thông tin khách + dịch vụ đã chọn
      const orderData = {
        ...form,
        serviceType: selectedService?.name,
        subServices: selectedSubCategories?.map((s: any) => ({ id: s.id, name: s.name })),
      };
      const userId = user?.id || 'customer-demo';
      const orderId = await createOrder(orderData, userId);
      navigation.navigate('Confirmation', { orderId });
    } catch (error) {
      Alert.alert('Lỗi', error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Dịch vụ đã chọn</Text>
        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{selectedService?.name}</Text>
        {selectedSubCategories?.length > 0 && selectedSubCategories.map((sub: any) => (
          <Text key={sub.id} style={{ marginLeft: 8 }}>• {sub.name}</Text>
        ))}
        <View style={styles.section}>
          <CustomInput
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            value={form.customerName}
            onChangeText={text => handleInputChange('customerName', text)}
            error={errors.customerName}
          />
          <CustomInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={form.phoneNumber}
            onChangeText={text => handleInputChange('phoneNumber', text)}
            error={errors.phoneNumber}
            keyboardType="phone-pad"
          />
          <CustomInput
            label="Địa chỉ"
            placeholder="Nhập địa chỉ chi tiết"
            value={form.address}
            onChangeText={text => handleInputChange('address', text)}
            error={errors.address}
            multiline
            numberOfLines={3}
          />
          <CustomInput
            label="Thời gian yêu cầu"
            placeholder="VD: Sáng mai, Chiều nay, Tối thứ 7..."
            value={form.requestedTime}
            onChangeText={text => handleInputChange('requestedTime', text)}
            error={errors.requestedTime}
          />
          <CustomInput
            label="Ghi chú (tùy chọn)"
            placeholder="Mô tả chi tiết vấn đề cần sửa chữa"
            value={form.notes}
            onChangeText={text => handleInputChange('notes', text)}
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title={isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
            onPress={handleSubmit}
            style={styles.submitButton}
            disabled={isLoading}
          />
        </View>
      </View>
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
});

export { CustomerInfoScreen };
