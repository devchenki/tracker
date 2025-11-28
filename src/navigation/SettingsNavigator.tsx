import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsStackParamList } from '../types';
import { NordColors } from '../theme/nord';

import SettingsScreen from '../screens/settings/SettingsScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';
import EditProfileScreen from '../screens/settings/EditProfileScreen';
import AllAchievementsScreen from '../screens/settings/AllAchievementsScreen';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: NordColors.frost.nord9,
        },
        headerTintColor: NordColors.snowStorm.nord6,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Настройки' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Профиль' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: 'Редактировать профиль' }}
      />
      <Stack.Screen
        name="AllAchievements"
        component={AllAchievementsScreen}
        options={{ title: 'Достижения' }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
