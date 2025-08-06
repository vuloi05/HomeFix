import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { ServiceFormScreen } from '../screens/ServiceFormScreen';
import { ConfirmationScreen } from '../screens/ConfirmationScreen';
import { OrderListScreen } from '../screens/OrderListScreen';
import WorkerScreen from '../screens/WorkerScreen';
import AdminScreen from '../screens/AdminScreen';
import { Colors } from '../Constants/colors';
import { Alert, Modal, View, Text, TouchableOpacity } from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { Ionicons } from '@expo/vector-icons';
import { ServiceSubCategoryScreen } from '../screens/ServiceSubCategoryScreen';
import { CustomerInfoScreen } from '../screens/CustomerInfoScreen';
import { ChatScreen } from '../screens/ChatScreen';

const CustomerStack = createStackNavigator<RootStackParamList>();
const CustomerTab = createBottomTabNavigator();
const WorkerStack = createStackNavigator();
const AdminStack = createStackNavigator();

const getHeaderLeft = (setRole: (role: null) => void) => (props: any) => (
  <TouchableOpacity
    style={{ marginLeft: 12 }}
    onPress={() => {
      setRole(null);
    }}
  >
    <Ionicons name="home-outline" size={24} color={props.tintColor || Colors.textLight} />
  </TouchableOpacity>
);

export const AppNavigator: React.FC = () => {
  const [role, setRole] = useState<'customer' | 'worker' | 'admin' | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const navigationRef = useRef<any>(null);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {role === null && (
          <WelcomeScreen
            navigation={navigationRef.current}
            role={role}
            setRole={setRole}
            setShowAdminModal={setShowModal}
            setAdminPassword={setAdminPassword}
          />
        )}
        {role === 'customer' && (
          <CustomerStack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary },
              headerTintColor: Colors.textLight,
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
            <CustomerStack.Screen
              name="CustomerTab"
              options={{ headerShown: false }}
            >
              {() => (
                <CustomerTab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                      let iconName = '';
                      if (route.name === 'ServiceForm') {
                        iconName = 'home-outline';
                      } else if (route.name === 'OrderList') {
                        iconName = 'list-outline';
                      }
                      return <Ionicons name={iconName as any} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: Colors.primary,
                    tabBarInactiveTintColor: Colors.textSecondary,
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerLeft: getHeaderLeft(setRole),
                  })}
                >
                  <CustomerTab.Screen
                    name="ServiceForm"
                    children={(props) => <ServiceFormScreen {...props} role={role} />}
                    options={{ title: 'Đặt dịch vụ' }}
                  />
                  <CustomerTab.Screen
                    name="OrderList"
                    children={(props) => <OrderListScreen {...props} role={role} />}
                    options={{ title: 'Quản lý đơn hàng' }}
                  />
                </CustomerTab.Navigator>
              )}
            </CustomerStack.Screen>
            <CustomerStack.Screen
              name="Confirmation"
              children={(props) => <ConfirmationScreen {...props} role={role} />}
              options={{ title: 'Xác nhận', headerTitleAlign: 'center', headerLeft: getHeaderLeft(setRole) }}
            />
            <CustomerStack.Screen
              name="ServiceSubCategory"
              component={ServiceSubCategoryScreen}
              options={{ title: 'Chọn dịch vụ chi tiết', headerTitleAlign: 'center', headerLeft: getHeaderLeft(setRole) }}
            />
            <CustomerStack.Screen
              name="CustomerInfo"
              component={CustomerInfoScreen}
              options={{ title: 'Thông tin khách hàng', headerTitleAlign: 'center', headerLeft: getHeaderLeft(setRole) }}
            />
            <CustomerStack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ title: 'Chat', headerTitleAlign: 'center', headerLeft: getHeaderLeft(setRole) }}
            />
          </CustomerStack.Navigator>
        )}
        {role === 'worker' && (
          <WorkerStack.Navigator
            initialRouteName="Worker"
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary },
              headerTintColor: Colors.textLight,
              headerTitleStyle: { fontWeight: 'bold' },
              headerLeft: getHeaderLeft(setRole),
            }}
          >
            <WorkerStack.Screen
              name="Worker"
              children={(props) => <WorkerScreen {...props} role={role} />}
              options={{ title: 'Trang thợ', headerTitleAlign: 'center' }}
            />
            <WorkerStack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ title: 'Chat', headerTitleAlign: 'center', headerLeft: getHeaderLeft(setRole) }}
            />
          </WorkerStack.Navigator>
        )}
        {role === 'admin' && (
          <AdminStack.Navigator
            initialRouteName="Admin"
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary },
              headerTintColor: Colors.textLight,
              headerTitleStyle: { fontWeight: 'bold' },
              headerLeft: getHeaderLeft(setRole),
            }}
          >
            <AdminStack.Screen
              name="Admin"
              children={(props) => <AdminScreen {...props} role={role} />}
              options={{ title: 'Trang admin', headerTitleAlign: 'center' }}
            />
          </AdminStack.Navigator>
        )}
      </NavigationContainer>
      {/* Modal nhập mật khẩu admin sẽ được điều khiển từ WelcomeScreen */}
    </>
  );
};
