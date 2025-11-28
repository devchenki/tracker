import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { Card, CardContent, CardTitle, Button } from '../../components/ui';
import { NordTheme } from '../../theme/nord';
import { ProgressService } from '../../services/ProgressService';

const DashboardProgress = () => {
  const courseProgress = ProgressService.getCourseProgress();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Course Progress
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Track your learning journey
        </Text>
      </View>

      {courseProgress.map((course) => (
        <Card key={course.id} style={styles.card}>
          <CardTitle title={course.title} />
          <CardContent>
            <View style={styles.progressInfo}>
              <Text variant="bodyMedium" style={styles.progressText}>
                {course.completedLessons} of {course.totalLessons} lessons
                completed
              </Text>
              <Text variant="bodyLarge" style={styles.progressPercent}>
                {course.progress}%
              </Text>
            </View>
            <ProgressBar
              progress={course.progress / 100}
              color={NordTheme.colors.primary}
              style={styles.progressBar}
            />
            <Button
              variant="outline"
              onPress={() => {}}
              style={styles.continueButton}
            >
              Continue Learning
            </Button>
          </CardContent>
        </Card>
      ))}
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
    marginBottom: 4,
  },
  subtitle: {
    color: NordTheme.colors.textSecondary,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    color: NordTheme.colors.textSecondary,
  },
  progressPercent: {
    color: NordTheme.colors.primary,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  continueButton: {
    marginTop: 4,
  },
});

export default DashboardProgress;
