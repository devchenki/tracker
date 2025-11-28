import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Card, CardContent, CardTitle, Button } from '../../components/ui';
import { AppTheme } from '../../theme/colors';

const CourseDetail = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          React Native Fundamentals
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Master the basics of React Native development
        </Text>
      </View>

      <Card style={styles.card}>
        <CardTitle title="Course Overview" />
        <CardContent>
          <Text variant="bodyMedium" style={styles.text}>
            Learn the fundamentals of React Native and build your first mobile
            application. This course covers components, navigation, state
            management, and more.
          </Text>
        </CardContent>
      </Card>

      <Card style={styles.card}>
        <CardTitle title="What You'll Learn" />
        <CardContent>
          <Text variant="bodyMedium" style={styles.bulletPoint}>
            • React Native core concepts
          </Text>
          <Text variant="bodyMedium" style={styles.bulletPoint}>
            • Component architecture
          </Text>
          <Text variant="bodyMedium" style={styles.bulletPoint}>
            • Navigation patterns
          </Text>
          <Text variant="bodyMedium" style={styles.bulletPoint}>
            • State management
          </Text>
        </CardContent>
      </Card>

      <View style={styles.buttonContainer}>
        <Button variant="primary" fullWidth onPress={() => {}}>
          Enroll Now
        </Button>
        <Button variant="outline" fullWidth onPress={() => {}}>
          View Curriculum
        </Button>
      </View>
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
    marginBottom: 8,
  },
  subtitle: {
    color: AppTheme.colors.textSecondary,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  text: {
    color: AppTheme.colors.text,
    lineHeight: 24,
  },
  bulletPoint: {
    color: AppTheme.colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
  },
});

export default CourseDetail;
