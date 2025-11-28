import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { Card, CardContent, CardTitle } from '../../components/ui';
import { NordTheme } from '../../theme/nord';

const CourseProgress = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Your Progress
        </Text>
      </View>

      <Card style={styles.card}>
        <CardTitle title="Overall Progress" />
        <CardContent>
          <Text variant="bodyMedium" style={styles.text}>
            15 of 20 lessons completed
          </Text>
          <ProgressBar
            progress={0.75}
            color={NordTheme.colors.primary}
            style={styles.progressBar}
          />
        </CardContent>
      </Card>
    </ScrollView>
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
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  text: {
    color: NordTheme.colors.text,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});

export default CourseProgress;
