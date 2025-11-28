import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../components/ui';
import { Card, CardContent, CardTitle } from '../../components/ui';
import { NordTheme } from '../../theme/nord';

const CATEGORIES = [
  { id: '1', name: 'Tutorials', count: 24, icon: '📚' },
  { id: '2', name: 'Guides', count: 18, icon: '📖' },
  { id: '3', name: 'Articles', count: 32, icon: '📝' },
  { id: '4', name: 'FAQs', count: 15, icon: '❓' },
];

const KnowledgeCategories = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Categories
        </Text>
      </View>

      <ScrollView style={styles.list}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity key={category.id}>
            <Card style={styles.card}>
              <CardContent>
                <View style={styles.categoryContent}>
                  <Text variant="displaySmall" style={styles.icon}>
                    {category.icon}
                  </Text>
                  <View style={styles.categoryInfo}>
                    <Text variant="titleLarge" style={styles.categoryName}>
                      {category.name}
                    </Text>
                    <Text variant="bodyMedium" style={styles.categoryCount}>
                      {category.count} items
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordTheme.colors.background,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    color: NordTheme.colors.text,
  },
  list: {
    flex: 1,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    color: NordTheme.colors.text,
    fontWeight: 'bold',
  },
  categoryCount: {
    color: NordTheme.colors.textSecondary,
  },
});

export default KnowledgeCategories;
