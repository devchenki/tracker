export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  DashboardTab: undefined;
  CoursesTab: undefined;
  KnowledgeTab: undefined;
  LabsTab: undefined;
  SettingsTab: undefined;
};

export type DashboardStackParamList = {
  DashboardOverview: undefined;
  DashboardInsights: undefined;
  DashboardProgress: undefined;
};

export type CoursesStackParamList = {
  CourseList: undefined;
  CoursesScreen: undefined;
  CourseDetail: { courseId: string };
  CourseDetailScreen: { courseId: string };
  CourseProgress: { courseId: string };
  CourseModules: { courseId: string };
};

export type KnowledgeStackParamList = {
  KnowledgeArticles: undefined;
  KnowledgeDetail: { articleId: string };
  KnowledgeCategories: undefined;
  KnowledgeSearch: undefined;
};

export type LabsStackParamList = {
  LabsQueue: undefined;
  LabsDetail: { labId: string };
  LabsActive: undefined;
  LabsHistory: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  SettingsGeneral: undefined;
  SettingsSecurity: undefined;
  SettingsNotifications: undefined;
  SettingsProfile: undefined;
  Profile: undefined;
  EditProfile: undefined;
  AllAchievements: undefined;
};
