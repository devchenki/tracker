import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MainTabParamList } from '../types';
import { NordTheme } from '../theme/nord';

import DashboardNavigator from './DashboardNavigator';
import CoursesNavigator from './CoursesNavigator';
import KnowledgeNavigator from './KnowledgeNavigator';
import LabsNavigator from './LabsNavigator';
import SettingsNavigator from './SettingsNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: NordTheme.colors.primary,
        tabBarInactiveTintColor: NordTheme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: NordTheme.colors.surface,
          borderTopColor: NordTheme.colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardNavigator}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CoursesTab"
        component={CoursesNavigator}
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-open-variant" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="KnowledgeTab"
        component={KnowledgeNavigator}
        options={{
          title: 'Knowledge',
          tabBarIcon: ({ color, size }) => (
            <Icon name="lightbulb-on" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="LabsTab"
        component={LabsNavigator}
        options={{
          title: 'Labs',
          tabBarIcon: ({ color, size }) => (
            <Icon name="flask" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsNavigator}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
