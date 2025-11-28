import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Card, CardContent, CardTitle } from '../../components/ui';
import { AppTheme } from '../../theme/colors';

const KnowledgeDetail = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Getting Started with React Native
        </Text>
        <Text variant="bodyMedium" style={styles.meta}>
          Tutorial • 5 min read
        </Text>
      </View>

      <Card style={styles.card}>
        <CardContent>
          <Text variant="bodyLarge" style={styles.text}>
            React Native is a powerful framework for building mobile
            applications using React. This article will guide you through the
            basics and help you get started with your first app.
          </Text>
          <Text variant="bodyMedium" style={styles.text}>
            {'\n'}In this guide, we'll cover:{'\n'}
            • Setting up your development environment{'\n'}
            • Creating your first React Native project{'\n'}
            • Understanding the basic components{'\n'}
            • Running your app on a simulator
          </Text>
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
    marginBottom: 8,
  },
  meta: {
    color: AppTheme.colors.textSecondary,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  text: {
    color: AppTheme.colors.text,
    lineHeight: 24,
  },
});

export default KnowledgeDetail;
