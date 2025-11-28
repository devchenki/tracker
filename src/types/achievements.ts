export type AchievementCategoryType = 
  | 'INJECTIONS'
  | 'LABS'
  | 'CYCLES'
  | 'CONSISTENCY'
  | 'MILESTONES';

export type AchievementStatus = 'UNLOCKED' | 'LOCKED';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: AchievementCategoryType;
  status: AchievementStatus;
  points: number;
  progress?: number;
  maxProgress?: number;
  unlockedDate?: string;
  icon: string;
}

export interface AchievementCategoryGroup {
  name: string;
  achievements: Achievement[];
}

export interface AchievementsSummary {
  totalAchievements: number;
  unlockedAchievements: number;
  totalPoints: number;
  maxPoints: number;
  progressPercentage: number;
}
