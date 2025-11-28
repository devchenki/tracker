import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List } from 'react-native-paper';
import { Card, Button } from '../../components/ui';
import { NordTheme } from '../../theme/nord';

const SettingsSecurity = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Security Settings
        </Text>
      </View>

      <Card style={styles.card}>
        <List.Item
          title="Change Password"
          description="Update your password"
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="Two-Factor Authentication"
          description="Not enabled"
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="Active Sessions"
          description="Manage your sessions"
          right={() => <List.Icon icon="chevron-right" />}
        />
      </Card>

      <View style={styles.buttonContainer}>
        <Button variant="outline" fullWidth onPress={() => {}}>
          Sign Out from All Devices
        </Button>
      </View>
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
  buttonContainer: {
    padding: 20,
  },
});

export default SettingsSecurity;
