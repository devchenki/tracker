import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, Button } from '../../components/ui';
import { AppTheme } from '../../theme/colors';

const SettingsProfile = () => {
  const { user, signOut } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Profile
        </Text>
      </View>

      <Card style={styles.card}>
        <CardContent>
          <View style={styles.avatarContainer}>
            <Avatar.Text
              size={80}
              label={user?.name?.charAt(0).toUpperCase() || 'U'}
              style={styles.avatar}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text variant="titleLarge" style={styles.name}>
              {user?.name}
            </Text>
            <Text variant="bodyMedium" style={styles.email}>
              {user?.email}
            </Text>
          </View>
        </CardContent>
      </Card>

      <View style={styles.buttonContainer}>
        <Button variant="outline" fullWidth onPress={() => {}}>
          Edit Profile
        </Button>
        <Button variant="primary" fullWidth onPress={signOut}>
          Sign Out
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
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: AppTheme.colors.primary,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    color: AppTheme.colors.text,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: AppTheme.colors.textSecondary,
  },
  buttonContainer: {
    padding: 20,
    gap: 12,
  },
});

export default SettingsProfile;
