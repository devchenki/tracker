import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardStackParamList } from '../types';

import DashboardScreen from '../screens/dashboard/DashboardScreen';
import DashboardInsights from '../screens/dashboard/DashboardInsights';
import DashboardProgress from '../screens/dashboard/DashboardProgress';

const Stack = createStackNavigator<DashboardStackParamList>();

const DashboardNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DashboardOverview"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Stack.Screen
        name="DashboardInsights"
        component={DashboardInsights}
        options={{ 
          title: 'Insights',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#81A1C1',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="DashboardProgress"
        component={DashboardProgress}
        options={{ 
          title: 'Progress',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#81A1C1',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
