import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './Navigation/AppNavigator';
import './services/firebase'; // Initialize Firebase

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}
