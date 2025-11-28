import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LabsStackParamList } from '../types';

import LabsQueue from '../screens/labs/LabsQueue';
import LabsDetail from '../screens/labs/LabsDetail';
import LabsActive from '../screens/labs/LabsActive';
import LabsHistory from '../screens/labs/LabsHistory';

const Stack = createStackNavigator<LabsStackParamList>();

const LabsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#81A1C1',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="LabsQueue"
        component={LabsQueue}
        options={{ title: 'Labs' }}
      />
      <Stack.Screen
        name="LabsDetail"
        component={LabsDetail}
        options={{ title: 'Lab Details' }}
      />
      <Stack.Screen
        name="LabsActive"
        component={LabsActive}
        options={{ title: 'Active Labs' }}
      />
      <Stack.Screen
        name="LabsHistory"
        component={LabsHistory}
        options={{ title: 'History' }}
      />
    </Stack.Navigator>
  );
};

export default LabsNavigator;
