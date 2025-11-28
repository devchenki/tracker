import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '../../components/ui';
import { useNavigation } from '@react-navigation/native';
import { Card, CardContent, CardTitle, Button } from '../../components/ui';
import { NordTheme } from '../../theme/nord';

const MOCK_LABS = [
  { id: '1', title: 'Build a Todo App', difficulty: 'Beginner', duration: '2 hours', status: 'available' },
  { id: '2', title: 'Create an API Client', difficulty: 'Intermediate', duration: '3 hours', status: 'in-progress' },
  { id: '3', title: 'Implement Auth Flow', difficulty: 'Advanced', duration: '4 hours', status: 'available' },
];

const LabsQueue = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Labs Queue
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Practice with hands-on exercises
        </Text>
      </View>

      <ScrollView style={styles.list}>
        {MOCK_LABS.map((lab) => (
          <Card key={lab.id} style={styles.card}>
            <CardTitle title={lab.title} subtitle={lab.difficulty} />
            <CardContent>
              <Text variant="bodyMedium" style={styles.duration}>
                ⏱️ {lab.duration}
              </Text>
              <Button
                variant={lab.status === 'in-progress' ? 'primary' : 'outline'}
                onPress={() => navigation.navigate('LabsDetail' as never, { labId: lab.id } as never)}
                style={styles.button}
              >
                {lab.status === 'in-progress' ? 'Continue' : 'Start Lab'}
              </Button>
            </CardContent>
          </Card>
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
    marginBottom: 4,
  },
  subtitle: {
    color: NordTheme.colors.textSecondary,
  },
  list: {
    flex: 1,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  duration: {
    color: NordTheme.colors.textSecondary,
    marginBottom: 12,
  },
  button: {
    marginTop: 4,
  },
});

export default LabsQueue;
