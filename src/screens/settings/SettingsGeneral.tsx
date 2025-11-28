import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch } from 'react-native-paper';
import { Card } from '../../components/ui';
import { AppTheme } from '../../theme/colors';

const SettingsGeneral = () => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          General Settings
        </Text>
      </View>

      <Card style={styles.card}>
        <List.Item
          title="Notifications"
          description="Enable push notifications"
          right={() => (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              color={AppTheme.colors.primary}
            />
          )}
        />
        <List.Item
          title="Dark Mode"
          description="Use dark theme"
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              color={AppTheme.colors.primary}
            />
          )}
        />
        <List.Item
          title="Language"
          description="English"
          right={() => <List.Icon icon="chevron-right" />}
        />
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
});

export default SettingsGeneral;
