import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { Text } from '../../components/ui';
import { NordColors } from '../../theme/nord';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [injectionReminders, setInjectionReminders] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [language, setLanguage] = useState('Русский');
  const [lockTimeout, setLockTimeout] = useState('5 min');

  const handleSignOut = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: () => signOut() },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Очистить данные',
      'Это действие удалит все ваши данные. Вы уверены?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: () => {
          Alert.alert('Успех', 'Данные очищены');
        }},
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert('Экспорт', 'Данные экспортированы в JSON файл');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Настройки</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Профиль</Text>
          <View style={styles.card}>
            <View style={styles.profileHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user?.name || 'User'}</Text>
                <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.settingItem}
              onPress={() => (navigation as any).navigate('EditProfileScreen')}
            >
              <Text style={styles.settingLabel}>Редактировать</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Аккаунт</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Смена пароля</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.settingItem} onPress={handleSignOut}>
              <Text style={[styles.settingLabel, styles.dangerText]}>Выход</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Приложение</Text>
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Язык</Text>
              <TouchableOpacity style={styles.languageButton}>
                <Text style={styles.languageText}>{language}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Уведомления</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: NordColors.polarNight.nord3, true: NordColors.frost.nord9 }}
                thumbColor={notifications ? NordColors.snowStorm.nord6 : NordColors.snowStorm.nord5}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Напоминание об инъекциях</Text>
              <Switch
                value={injectionReminders}
                onValueChange={setInjectionReminders}
                trackColor={{ false: NordColors.polarNight.nord3, true: NordColors.frost.nord9 }}
                thumbColor={injectionReminders ? NordColors.snowStorm.nord6 : NordColors.snowStorm.nord5}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Включить звук</Text>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: NordColors.polarNight.nord3, true: NordColors.frost.nord9 }}
                thumbColor={soundEnabled ? NordColors.snowStorm.nord6 : NordColors.snowStorm.nord5}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Безопасность</Text>
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>PIN код</Text>
              <Switch
                value={pinEnabled}
                onValueChange={setPinEnabled}
                trackColor={{ false: NordColors.polarNight.nord3, true: NordColors.frost.nord9 }}
                thumbColor={pinEnabled ? NordColors.snowStorm.nord6 : NordColors.snowStorm.nord5}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Биометрия</Text>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: NordColors.polarNight.nord3, true: NordColors.frost.nord9 }}
                thumbColor={biometricEnabled ? NordColors.snowStorm.nord6 : NordColors.snowStorm.nord5}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Блокировка приложения</Text>
              <TouchableOpacity style={styles.lockTimeoutButton}>
                <Text style={styles.lockTimeoutText}>{lockTimeout}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Данные</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.settingItem} onPress={handleExportData}>
              <Text style={styles.settingLabel}>Экспорт данных</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Размер базы</Text>
              <Text style={styles.settingValue}>5.2 MB</Text>
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.settingItem} onPress={handleClearData}>
              <Text style={[styles.settingLabel, styles.dangerText]}>Очистить все данные</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>О приложении</Text>
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Версия приложения</Text>
              <Text style={styles.settingValue}>1.0.0</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Build</Text>
              <Text style={styles.settingValue}>001</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>SDK</Text>
              <Text style={styles.settingValue}>53</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Год выпуска</Text>
              <Text style={styles.settingValue}>2025</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Поддержка</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Написать в поддержку</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Сообщить об ошибке</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingLabel}>Оценить приложение</Text>
              <Text style={styles.settingArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordColors.polarNight.nord0,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: NordColors.polarNight.nord1,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: NordColors.frost.nord8,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: NordColors.frost.nord9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: NordColors.polarNight.nord0,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord4,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: NordColors.polarNight.nord3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
  },
  settingValue: {
    fontSize: 16,
    color: NordColors.polarNight.nord3,
  },
  settingArrow: {
    fontSize: 18,
    color: NordColors.polarNight.nord3,
  },
  dangerText: {
    color: NordColors.aurora.nord11,
  },
  divider: {
    height: 1,
    backgroundColor: NordColors.polarNight.nord2,
    marginHorizontal: 16,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: NordColors.polarNight.nord0,
    borderRadius: 8,
  },
  languageText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
  },
  lockTimeoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: NordColors.polarNight.nord0,
    borderRadius: 8,
  },
  lockTimeoutText: {
    fontSize: 14,
    color: NordColors.snowStorm.nord4,
  },
});

export default SettingsScreen;
