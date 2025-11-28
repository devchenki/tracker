import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import { Card, CardContent, CardTitle, Button } from '../../components/ui';
import { AppTheme } from '../../theme/colors';

const LabsActive = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Active Labs
        </Text>
      </View>

      <Card style={styles.card}>
        <CardTitle title="Create an API Client" subtitle="In Progress" />
        <CardContent>
          <Text variant="bodyMedium" style={styles.progressText}>
            Step 2 of 5 completed
          </Text>
          <ProgressBar
            progress={0.4}
            color={AppTheme.colors.primary}
            style={styles.progressBar}
          />
          <Button variant="primary" onPress={() => {}} style={styles.button}>
            Continue Lab
          </Button>
        </CardContent>
      </Card>
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
    marginBottom: 16,
  },
  progressText: {
    color: AppTheme.colors.textSecondary,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    marginTop: 4,
  },
});

export default LabsActive;
