import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import { Text } from '../../components/ui';
import { Card, CardContent } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';
import { NordColors } from '../../theme/nord';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsService from '../../services/SettingsService';
import { AppSettings, DataInfo, AppInfo } from '../../types/settings';
import * as LocalAuthentication from 'expo-local-authentication';

const SettingsScreen = ({ navigation }: any) => {
  const { user, signOut } = useAuth();
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [dataInfo, setDataInfo] = useState<DataInfo | null>(null);
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);
  const appInfo: AppInfo = SettingsService.getAppInfo();

  useEffect(() => {
    loadSettings();
    loadDataInfo();
    checkBiometrics();
  }, []);

  const loadSettings = async () => {
    const data = await SettingsService.getSettings();
    setSettings(data);
  };

  const loadDataInfo = async () => {
    const info = await SettingsService.getDataInfo();
    setDataInfo(info);
  };

  const checkBiometrics = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setBiometricsAvailable(compatible && enrolled);
  };

  const updateSetting = async (key: keyof AppSettings, value: any) => {
    if (!settings) return;
    const updated = await SettingsService.updateSettings({ [key]: value });
    setSettings(updated);
  };

  const handleExportData = async () => {
    try {
      const data = await SettingsService.exportData();
      Alert.alert('Экспорт данных', 'Данные экспортированы успешно!');
      // In real app, would share/save the file
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось экспортировать данные');
    }
  };

  const handleClearData = () => {
    Alert.alert(
      'Очистить все данные',
      'Вы уверены? Это действие нельзя отменить.',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            await SettingsService.clearAllData();
            Alert.alert('Успешно', 'Все данные очищены');
          },
        },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: signOut },
      ]
    );
  };

  if (!settings) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  const SectionTitle = ({ title }: { title: string }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const SettingsItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = false,
    renderRight,
  }: any) => (
    <TouchableOpacity 
      style={styles.settingsItem} 
      onPress={onPress}
      disabled={!onPress && !renderRight}
    >
      <View style={styles.settingsItemLeft}>
        <Icon name={icon} size={24} color={NordColors.frost.nord9} />
        <View style={styles.settingsItemText}>
          <Text style={styles.settingsItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {renderRight ? renderRight() : showArrow && (
        <Icon name="chevron-right" size={24} color={NordColors.polarNight.nord3} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <Card style={styles.card}>
        <CardContent>
          <TouchableOpacity 
            style={styles.profileSection}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
            </View>
            <Icon name="chevron-right" size={24} color={NordColors.polarNight.nord3} />
          </TouchableOpacity>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <SectionTitle title="АККАУНТ" />
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <SettingsItem
            icon="lock-reset"
            title="Смена пароля"
            onPress={() => Alert.alert('Смена пароля', 'Функция в разработке')}
            showArrow
          />
          <SettingsItem
            icon="two-factor-authentication"
            title="Двухфакторная аутентификация"
            subtitle="Повышенная безопасность"
            onPress={() => Alert.alert('2FA', 'Функция в разработке')}
            showArrow
          />
          <SettingsItem
            icon="logout"
            title="Выход из аккаунта"
            onPress={handleSignOut}
            showArrow
          />
        </CardContent>
      </Card>

      {/* App Settings */}
      <SectionTitle title="НАСТРОЙКИ ПРИЛОЖЕНИЯ" />
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <SettingsItem
            icon="theme-light-dark"
            title="Темный режим"
            subtitle="Всегда включен (Nord тема)"
            renderRight={() => (
              <Switch
                value={settings.darkMode}
                onValueChange={(val) => updateSetting('darkMode', val)}
                trackColor={{ false: NordColors.polarNight.nord3, true: NordColors.frost.nord9 }}
                thumbColor={NordColors.snowStorm.nord4}
              />
            )}
          />
          <SettingsItem
            icon="translate"
            title="Язык"
            subtitle={settings.language === 'ru' ? 'Русский' : 'English'}
            onPress={() => {
              const newLang = settings.language === 'ru' ? 'en' : 'ru';
              updateSetting('language', newLang);
            }}
            showArrow
          />
          <SettingsItem
            icon="bell"
            title="Уведомления"
            renderRight={() => (
              <Switch
                value={settings.notifications}
                onValueChange={(val) => updateSetting('notifications', val)}
                trackColor={{ false: NordColors.polarNight.nord3, true: NordColors.frost.nord9 }}
                thumbColor={NordColors.snowStorm.nord4}
              />
            )}
          />
          <SettingsItem
            icon="needle"
            title="Напоминание об инъекциях"
            renderRight={() => (
              <Switch
                value={settings.injectionReminders}
                onValueChange={(val) => updateSetting('injectionReminders', val)}
                trackColor={{ false: NordColors.polarNight.nord3, true: NordColors.frost.nord9 }}
                thumbColor={NordColors.snowStorm.nord4}
              />
            )}
          />
        </CardContent>
      </Card>

      {/* Security */}
      <SectionTitle title="БЕЗОПАСНОСТЬ" />
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <SettingsItem
            icon="lock"
            title="PIN код"
            subtitle={settings.pinEnabled ? 'Включен' : 'Отключен'}
            renderRight={() => (
              <Switch
                value={settings.pinEnabled}
                onValueChange={(val) => updateSetting('pinEnabled', val)}
                trackColor={{ false: NordColors.polarNight.nord3, true: NordColors.frost.nord9 }}
                thumbColor={NordColors.snowStorm.nord4}
              />
            )}
          />
          <SettingsItem
            icon="fingerprint"
            title="Биометрия"
            subtitle={biometricsAvailable 
              ? (settings.biometricsEnabled ? 'Включена' : 'Отключена')
              : 'Недоступна'
            }
            renderRight={() => (
              <Switch
                value={settings.biometricsEnabled}
                onValueChange={(val) => updateSetting('biometricsEnabled', val)}
                disabled={!biometricsAvailable}
                trackColor={{ false: NordColors.polarNight.nord3, true: NordColors.frost.nord9 }}
                thumbColor={NordColors.snowStorm.nord4}
              />
            )}
          />
          <SettingsItem
            icon="timer-lock"
            title="Блокировка приложения"
            subtitle={`Через ${settings.autoLockMinutes} минут`}
            onPress={() => {
              Alert.alert(
                'Время блокировки',
                'Выберите время',
                [
                  { text: '1 минута', onPress: () => updateSetting('autoLockMinutes', 1) },
                  { text: '5 минут', onPress: () => updateSetting('autoLockMinutes', 5) },
                  { text: '15 минут', onPress: () => updateSetting('autoLockMinutes', 15) },
                  { text: 'Отмена', style: 'cancel' },
                ]
              );
            }}
            showArrow
          />
        </CardContent>
      </Card>

      {/* Data */}
      <SectionTitle title="ДАННЫЕ" />
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <SettingsItem
            icon="export"
            title="Экспорт данных"
            subtitle="JSON файл"
            onPress={handleExportData}
            showArrow
          />
          <SettingsItem
            icon="import"
            title="Импорт данных"
            onPress={() => Alert.alert('Импорт', 'Функция в разработке')}
            showArrow
          />
          <SettingsItem
            icon="delete-forever"
            title="Очистить все данные"
            subtitle="С подтверждением"
            onPress={handleClearData}
            showArrow
          />
          <SettingsItem
            icon="database"
            title="Размер базы данных"
            subtitle={dataInfo?.databaseSize || 'Загрузка...'}
          />
        </CardContent>
      </Card>

      {/* About */}
      <SectionTitle title="О ПРИЛОЖЕНИИ" />
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <SettingsItem
            icon="information"
            title="Версия приложения"
            subtitle={appInfo.version}
          />
          <SettingsItem
            icon="hammer-wrench"
            title="Build"
            subtitle={appInfo.build}
          />
          <SettingsItem
            icon="calendar"
            title="Год выпуска"
            subtitle={appInfo.year.toString()}
          />
          <SettingsItem
            icon="file-document"
            title="Лицензия"
            onPress={() => Alert.alert('Лицензия', 'MIT License')}
            showArrow
          />
          <SettingsItem
            icon="account-circle"
            title="Разработчик"
            subtitle="TrackerSteroid Team"
          />
        </CardContent>
      </Card>

      {/* Support */}
      <SectionTitle title="ПОДДЕРЖКА" />
      <Card style={styles.card}>
        <CardContent style={styles.cardContent}>
          <SettingsItem
            icon="email"
            title="Написать в поддержку"
            onPress={() => Linking.openURL('mailto:support@trackersteroid.app')}
            showArrow
          />
          <SettingsItem
            icon="help-circle"
            title="FAQ"
            onPress={() => Alert.alert('FAQ', 'Функция в разработке')}
            showArrow
          />
          <SettingsItem
            icon="bug"
            title="Сообщить об ошибке"
            onPress={() => Linking.openURL('mailto:bugs@trackersteroid.app')}
            showArrow
          />
          <SettingsItem
            icon="star"
            title="Оценить приложение"
            onPress={() => Alert.alert('Оценка', 'Спасибо за поддержку!')}
            showArrow
          />
        </CardContent>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          TrackerSteroid © {appInfo.year}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NordColors.polarNight.nord0,
  },
  loadingText: {
    color: NordColors.snowStorm.nord4,
    textAlign: 'center',
    marginTop: 50,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: NordColors.polarNight.nord1,
    borderRadius: 12,
  },
  cardContent: {
    padding: 0,
  },
  profileSection: {
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
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: NordColors.snowStorm.nord6,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: NordColors.snowStorm.nord4,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: NordColors.polarNight.nord3,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: NordColors.polarNight.nord3,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 8,
    letterSpacing: 1,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: NordColors.polarNight.nord0,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemText: {
    marginLeft: 16,
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    color: NordColors.snowStorm.nord4,
    marginBottom: 2,
  },
  settingsItemSubtitle: {
    fontSize: 13,
    color: NordColors.polarNight.nord3,
  },
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: NordColors.polarNight.nord3,
  },
});

export default SettingsScreen;
