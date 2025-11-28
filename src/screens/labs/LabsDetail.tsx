import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Card, CardContent, CardTitle, Button } from '../../components/ui';
import { AppTheme } from '../../theme/colors';

const LabsDetail = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Build a Todo App
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Beginner • 2 hours
        </Text>
      </View>

      <Card style={styles.card}>
        <CardTitle title="Lab Overview" />
        <CardContent>
          <Text variant="bodyMedium" style={styles.text}>
            In this lab, you'll build a complete Todo application with React
            Native. You'll learn about state management, user input, and list
            rendering.
          </Text>
        </CardContent>
      </Card>

      <Card style={styles.card}>
        <CardTitle title="Requirements" />
        <CardContent>
          <Text variant="bodyMedium" style={styles.bulletPoint}>
            • Basic knowledge of React
          </Text>
          <Text variant="bodyMedium" style={styles.bulletPoint}>
            • Understanding of JavaScript ES6+
          </Text>
          <Text variant="bodyMedium" style={styles.bulletPoint}>
            • Development environment set up
          </Text>
        </CardContent>
      </Card>

      <View style={styles.buttonContainer}>
        <Button variant="primary" fullWidth onPress={() => {}}>
          Start Lab
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
  },
  buttonContainer: {
    padding: 20,
  },
});

export default LabsDetail;
