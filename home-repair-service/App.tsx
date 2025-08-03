import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './Navigation/AppNavigator';
import { OrderProvider } from './contexts/OrderContext';

export default function App() {
  return (
    <OrderProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </OrderProvider>
  );
}
