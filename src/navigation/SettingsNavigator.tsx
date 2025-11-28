import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsStackParamList } from '../types';

import SettingsGeneral from '../screens/settings/SettingsGeneral';
import SettingsSecurity from '../screens/settings/SettingsSecurity';
import SettingsNotifications from '../screens/settings/SettingsNotifications';
import SettingsProfile from '../screens/settings/SettingsProfile';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigator = () => {
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
        name="SettingsProfile"
        component={SettingsProfile}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="SettingsGeneral"
        component={SettingsGeneral}
        options={{ title: 'General' }}
      />
      <Stack.Screen
        name="SettingsSecurity"
        component={SettingsSecurity}
        options={{ title: 'Security' }}
      />
      <Stack.Screen
        name="SettingsNotifications"
        component={SettingsNotifications}
        options={{ title: 'Notifications' }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
