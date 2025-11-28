import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Card, CardContent, CardTitle } from '../../components/ui';
import { AppTheme } from '../../theme/colors';

const COMPLETED_LABS = [
  { id: '1', title: 'Build a Todo App', completedAt: '2 days ago', score: 95 },
  { id: '2', title: 'Simple Calculator', completedAt: '1 week ago', score: 88 },
];

const LabsHistory = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Completed Labs
        </Text>
      </View>

      {COMPLETED_LABS.map((lab) => (
        <Card key={lab.id} style={styles.card}>
          <CardTitle title={lab.title} subtitle={lab.completedAt} />
          <CardContent>
            <Text variant="bodyLarge" style={styles.score}>
              Score: {lab.score}%
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
  score: {
    color: AppTheme.colors.primary,
    fontWeight: 'bold',
  },
});

export default LabsHistory;
