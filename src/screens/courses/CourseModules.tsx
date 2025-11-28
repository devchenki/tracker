import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Card, CardContent, CardTitle } from '../../components/ui';
import { AppTheme } from '../../theme/colors';

const CourseModules = () => {
  const modules = [
    { id: 1, title: 'Introduction to React Native', lessons: 5, completed: true },
    { id: 2, title: 'Components and Props', lessons: 8, completed: true },
    { id: 3, title: 'State and Lifecycle', lessons: 6, completed: false },
    { id: 4, title: 'Navigation', lessons: 7, completed: false },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Course Modules
        </Text>
      </View>

      {modules.map((module) => (
        <Card key={module.id} style={styles.card}>
          <CardTitle
            title={module.title}
            subtitle={`${module.lessons} lessons`}
          />
          <CardContent>
            <Text
              variant="bodyMedium"
              style={[
                styles.status,
                { color: module.completed ? AppTheme.colors.success : AppTheme.colors.textSecondary },
              ]}
            >
              {module.completed ? '✓ Completed' : 'In Progress'}
            </Text>
          </CardContent>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  header: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    color: AppTheme.colors.text,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  status: {
    fontWeight: '600',
  },
});

export default CourseModules;
