import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CoursesStackParamList } from '../types';

import CoursesScreen from '../screens/courses/CoursesScreen';
import CourseDetailScreen from '../screens/courses/CourseDetailScreen';
import CourseList from '../screens/courses/CourseList';
import CourseDetail from '../screens/courses/CourseDetail';
import CourseProgress from '../screens/courses/CourseProgress';
import CourseModules from '../screens/courses/CourseModules';

const Stack = createStackNavigator<CoursesStackParamList>();

const CoursesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="CoursesScreen"
        component={CoursesScreen}
        options={{ title: 'Циклы' }}
      />
      <Stack.Screen
        name="CourseDetailScreen"
        component={CourseDetailScreen}
        options={{ title: 'Детали цикла' }}
      />
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
