import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings, DataInfo, AppInfo } from '../types/settings';

class SettingsService {
  private readonly SETTINGS_KEY = '@app_settings';

  private defaultSettings: AppSettings = {
    darkMode: true,
    language: 'ru',
    notifications: true,
    injectionReminders: true,
    pinEnabled: false,
    biometricsEnabled: false,
    autoLockMinutes: 5,
  };

  async getSettings(): Promise<AppSettings> {
    try {
      const stored = await AsyncStorage.getItem(this.SETTINGS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return this.defaultSettings;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return this.defaultSettings;
    }
  }

  async updateSettings(updates: Partial<AppSettings>): Promise<AppSettings> {
    try {
      const current = await this.getSettings();
      const updated = { ...current, ...updates };
      await AsyncStorage.setItem(this.SETTINGS_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Failed to update settings:', error);
      throw error;
    }
  }

  async resetSettings(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.SETTINGS_KEY, JSON.stringify(this.defaultSettings));
    } catch (error) {
      console.error('Failed to reset settings:', error);
      throw error;
    }
  }

  async getDataInfo(): Promise<DataInfo> {
    // Mock data - in real app would calculate actual database size
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          databaseSize: '2.4 MB',
          lastBackup: '2025-01-23',
        });
      }, 200);
    });
  }

  getAppInfo(): AppInfo {
    return {
      version: '1.0.0',
      build: '001',
      year: 2025,
    };
  }

  async exportData(): Promise<string> {
    // Mock export - would generate JSON file with all user data
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockData = {
          version: '1.0.0',
          exportDate: new Date().toISOString(),
          data: {
            profile: {},
            cycles: [],
            injections: [],
            labs: [],
            healthMetrics: [],
          },
        };
        resolve(JSON.stringify(mockData, null, 2));
      }, 500);
    });
  }

  async importData(jsonData: string): Promise<void> {
    // Mock import - would parse and restore user data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          JSON.parse(jsonData);
          resolve();
        } catch (error) {
          reject(new Error('Invalid data format'));
        }
      }, 500);
    });
  }

  async clearAllData(): Promise<void> {
    // Mock clear - would delete all user data except auth
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  }
}

export default new SettingsService();
