import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CoursesStackParamList } from '../types';

import CourseList from '../screens/courses/CourseList';
import CourseDetail from '../screens/courses/CourseDetail';
import CourseProgress from '../screens/courses/CourseProgress';
import CourseModules from '../screens/courses/CourseModules';

const Stack = createStackNavigator<CoursesStackParamList>();

const CoursesNavigator = () => {
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
        name="CourseList"
        component={CourseList}
        options={{ title: 'Courses' }}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{ title: 'Course Details' }}
      />
      <Stack.Screen
        name="CourseProgress"
        component={CourseProgress}
        options={{ title: 'Progress' }}
      />
      <Stack.Screen
        name="CourseModules"
        component={CourseModules}
        options={{ title: 'Modules' }}
      />
    </Stack.Navigator>
  );
};

export default CoursesNavigator;
