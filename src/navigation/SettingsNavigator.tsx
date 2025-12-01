import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsStackParamList } from '../types';

import SettingsGeneral from '../screens/settings/SettingsGeneral';
import SettingsSecurity from '../screens/settings/SettingsSecurity';
import SettingsNotifications from '../screens/settings/SettingsNotifications';
import SettingsProfile from '../screens/settings/SettingsProfile';
import SettingsScreen from '../screens/settings/SettingsScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';
import EditProfileScreen from '../screens/settings/EditProfileScreen';
import AllAchievementsScreen from '../screens/settings/AllAchievementsScreen';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen
        name="AllAchievementsScreen"
        component={AllAchievementsScreen}
        options={{ title: 'Achievements' }}
      />
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
