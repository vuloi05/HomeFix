import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { ServiceFormScreen } from '../screens/ServiceFormScreen';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { OrderListScreen } from '../screens/OrderListScreen';
import { Colors } from '../Constants/colors';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.textLight,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ServiceForm"
          component={ServiceFormScreen}
          options={{
            title: 'Đặt dịch vụ',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{
            title: 'Xác nhận',
            headerTitleAlign: 'center',
            headerLeft: () => null, // Disable back button
          }}
        />
        <Stack.Screen
          name="OrderList"
          component={OrderListScreen}
          options={{
            title: 'Quản lý đơn hàng',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
