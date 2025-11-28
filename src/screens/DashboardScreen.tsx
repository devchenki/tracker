import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const DashboardScreen = () => {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Text variant="headlineMedium" style={styles.title}>
          Dashboard
        </Text>
        <Text variant="bodyLarge" style={styles.welcomeText}>
          Welcome, {user?.name}!
        </Text>
        <Text variant="bodyMedium" style={styles.emailText}>
          {user?.email}
        </Text>
        <Button
          mode="contained"
          onPress={signOut}
          style={styles.button}
        >
          Sign Out
        </Button>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  surface: {
    padding: 24,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  welcomeText: {
    marginBottom: 8,
  },
  emailText: {
    color: '#666',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 6,
  },
});

export default DashboardScreen;
