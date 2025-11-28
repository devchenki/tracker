import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch } from 'react-native-paper';
import { Card } from '../../components/ui';
import { NordTheme } from '../../theme/nord';

const SettingsNotifications = () => {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [courseUpdates, setCourseUpdates] = React.useState(true);
  const [labReminders, setLabReminders] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Notification Settings
        </Text>
      </View>

      <Card style={styles.card}>
        <List.Item
          title="Email Notifications"
          description="Receive email updates"
          right={() => (
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              color={NordTheme.colors.primary}
            />
          )}
        />
        <List.Item
          title="Course Updates"
          description="New lessons and content"
          right={() => (
            <Switch
              value={courseUpdates}
              onValueChange={setCourseUpdates}
              color={NordTheme.colors.primary}
            />
          )}
        />
        <List.Item
          title="Lab Reminders"
          description="Reminders for pending labs"
          right={() => (
            <Switch
              value={labReminders}
              onValueChange={setLabReminders}
              color={NordTheme.colors.primary}
            />
          )}
        />
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
});

export default SettingsNotifications;
