export type UserStatus = 'Active' | 'On Break';
export type ExperienceLevel = 'Beginner' | 'Experienced' | 'Professional';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  weight?: number;
  height?: number;
  phone?: string;
  status: UserStatus;
  experienceLevel: ExperienceLevel;
  emailNotifications: boolean;
  avatar?: string;
}

export interface ProfileMetrics {
  totalCycles: number;
  totalInjections: number;
  trackingDays: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}

export interface CurrentProgress {
  weight: number;
  weightChange: number;
  benchPress?: number;
  squat?: number;
  deadlift?: number;
  bodyFat?: number;
  bodyFatChange?: number;
}

export interface ProfileStats {
  mostActiveDay: string;
  longestStreak: number;
  averageCycleLength: number;
}
