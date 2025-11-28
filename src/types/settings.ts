export interface AppSettings {
  darkMode: boolean;
  language: 'en' | 'ru';
  notifications: boolean;
  injectionReminders: boolean;
  pinEnabled: boolean;
  biometricsEnabled: boolean;
  autoLockMinutes: number;
}

export interface DataInfo {
  databaseSize: string;
  lastBackup?: string;
}

export interface AppInfo {
  version: string;
  build: string;
  year: number;
}
