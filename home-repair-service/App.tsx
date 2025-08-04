import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './Navigation/AppNavigator';

import { OrderProvider } from './contexts/OrderContext';
import { UserProvider } from './contexts/UserContext';

export default function App() {
  return (
    <UserProvider>
      <OrderProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </OrderProvider>
    </UserProvider>
  );
}
