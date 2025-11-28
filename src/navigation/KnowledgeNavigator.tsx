import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { KnowledgeStackParamList } from '../types';

import KnowledgeArticles from '../screens/knowledge/KnowledgeArticles';
import KnowledgeDetail from '../screens/knowledge/KnowledgeDetail';
import KnowledgeCategories from '../screens/knowledge/KnowledgeCategories';
import KnowledgeSearch from '../screens/knowledge/KnowledgeSearch';
import KnowledgeBaseScreen from '../screens/knowledge/KnowledgeBaseScreen';

const Stack = createStackNavigator<KnowledgeStackParamList>();

const KnowledgeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="KnowledgeBaseScreen"
        component={KnowledgeBaseScreen}
        options={{ title: 'Knowledge Base' }}
      />
      <Stack.Screen
        name="KnowledgeArticles"
        component={KnowledgeArticles}
        options={{ title: 'Knowledge' }}
      />
      <Stack.Screen
        name="KnowledgeDetail"
        component={KnowledgeDetail}
        options={{ title: 'Article' }}
      />
      <Stack.Screen
        name="KnowledgeCategories"
        component={KnowledgeCategories}
        options={{ title: 'Categories' }}
      />
      <Stack.Screen
        name="KnowledgeSearch"
        component={KnowledgeSearch}
        options={{ title: 'Search' }}
      />
    </Stack.Navigator>
  );
};

export default KnowledgeNavigator;
