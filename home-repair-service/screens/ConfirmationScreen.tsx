import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, UserRole } from '../types';
import { CustomButton } from '../components/CustomButton';
import { Colors } from '../Constants/colors';

type ConfirmationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Confirmation'>;
type ConfirmationScreenRouteProp = RouteProp<RootStackParamList, 'Confirmation'>;

interface ConfirmationScreenProps {
  navigation: ConfirmationScreenNavigationProp;
  route: ConfirmationScreenRouteProp;
  role: UserRole;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ navigation, route, role }) => {
  const { orderId } = route.params;

  const handleGoHome = () => {
    navigation.navigate('Welcome');
  };

  const handleViewOrders = () => {
    navigation.navigate('OrderList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.successIcon}>✅</Text>
        </View>

        {/* Success Message */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Đặt dịch vụ thành công!</Text>
          <Text style={styles.subtitle}>
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
          </Text>
          <Text style={styles.description}>
            Đơn hàng của bạn đã được ghi nhận và đang chờ xác nhận. 
            Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
          </Text>
        </View>

        {/* Order ID */}
        <View style={styles.orderInfo}>
          <Text style={styles.orderLabel}>Mã đơn hàng:</Text>
          <Text style={styles.orderId}>#{orderId.slice(-6)}</Text>
        </View>

        {/* Next Steps */}
        <View style={styles.stepsContainer}>
          <Text style={styles.stepsTitle}>Các bước tiếp theo:</Text>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>Chúng tôi sẽ xác nhận đơn hàng trong vòng 30 phút</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>Thợ sẽ liên hệ để xác nhận thời gian và địa điểm</Text>
          </View>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>Thợ sẽ đến đúng thời gian đã hẹn</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Về trang chủ"
          onPress={handleGoHome}
          variant="outline"
          style={styles.button}
        />
        <CustomButton
          title="Xem đơn hàng"
          onPress={handleViewOrders}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 80,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  orderInfo: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  orderLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  stepsContainer: {
    width: '100%',
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    color: Colors.textLight,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  stepText: {
    fontSize: 16,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  button: {
    marginBottom: 12,
  },
});
