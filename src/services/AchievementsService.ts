import AsyncStorage from '@react-native-async-storage/async-storage';

export type AchievementCategory = 'Injections' | 'Labs' | 'Cycles' | 'Consistency' | 'Milestones';

export interface Achievement {
  id: string;
  category: AchievementCategory;
  name: string;
  description: string;
  points: number;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
  icon: string;
}

const STORAGE_KEY = '@trackersteroid_achievements';

const ACHIEVEMENTS_TEMPLATE: Omit<Achievement, 'unlocked' | 'unlockedDate' | 'progress'>[] = [
  // Injections
  { id: 'first_shot', category: 'Injections', name: 'First Shot', description: 'Запишите первую инъекцию', points: 10, maxProgress: 1, icon: '🎯' },
  { id: 'streak_7', category: 'Injections', name: 'Injection Streak - 7', description: 'Сделайте 7 инъекций подряд по расписанию', points: 50, maxProgress: 7, icon: '💉' },
  { id: 'streak_30', category: 'Injections', name: 'Injection Streak - 30', description: 'Сделайте 30 инъекций подряд', points: 200, maxProgress: 30, icon: '💉' },
  { id: 'century', category: 'Injections', name: 'Century', description: 'Сделайте 100 инъекций', points: 500, maxProgress: 100, icon: '💪' },
  
  // Labs
  { id: 'lab_scientist', category: 'Labs', name: 'Lab Scientist', description: 'Добавьте первый результат', points: 10, maxProgress: 1, icon: '🧪' },
  { id: 'data_keeper_10', category: 'Labs', name: 'Data Keeper - 10', description: 'Добавьте 10 результатов', points: 100, maxProgress: 10, icon: '📊' },
  { id: 'data_keeper_50', category: 'Labs', name: 'Data Keeper - 50', description: 'Добавьте 50 результатов', points: 500, maxProgress: 50, icon: '📊' },
  
  // Cycles
  { id: 'first_cycle', category: 'Cycles', name: 'First Cycle', description: 'Завершите первый цикл', points: 200, maxProgress: 1, icon: '🚀' },
  { id: 'cycle_historian_3', category: 'Cycles', name: 'Cycle Historian - 3', description: 'Завершите 3 цикла', points: 300, maxProgress: 3, icon: '🔄' },
  { id: 'expert_cyclist', category: 'Cycles', name: 'Expert Cyclist', description: 'Завершите 10 циклов', points: 1000, maxProgress: 10, icon: '🏆' },
  
  // Consistency
  { id: 'week_warrior', category: 'Consistency', name: 'Week Warrior', description: 'Используйте приложение 7 дней подряд', points: 75, maxProgress: 7, icon: '🔥' },
  { id: 'month_master', category: 'Consistency', name: 'Month Master', description: '30 дней подряд', points: 300, maxProgress: 30, icon: '📅' },
  { id: 'year_tracker', category: 'Consistency', name: 'Year Tracker', description: '365 дней подряд', points: 5000, maxProgress: 365, icon: '⭐' },
  
  // Milestones
  { id: 'knowledge_master', category: 'Milestones', name: 'Knowledge Master', description: 'Прочитайте всю базу знаний', points: 250, maxProgress: 28, icon: '💯' },
  { id: 'all_in', category: 'Milestones', name: 'All-In', description: 'Используйте все функции приложения', points: 500, maxProgress: 8, icon: '🎖️' },
];

class AchievementsServiceClass {
  async initializeAchievements(): Promise<void> {
    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      if (!existing) {
        const achievements: Achievement[] = ACHIEVEMENTS_TEMPLATE.map(template => ({
          ...template,
          unlocked: false,
          progress: 0,
        }));
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
      }
    } catch (error) {
      console.error('Error initializing achievements:', error);
    }
  }

  async getAchievements(): Promise<Achievement[]> {
    try {
      await this.initializeAchievements();
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting achievements:', error);
      return [];
    }
  }

  async getAchievementsByCategory(category: AchievementCategory): Promise<Achievement[]> {
    const achievements = await this.getAchievements();
    return achievements.filter(a => a.category === category);
  }

  async updateProgress(id: string, progress: number): Promise<Achievement | null> {
    try {
      const achievements = await this.getAchievements();
      const achievement = achievements.find(a => a.id === id);
      
      if (!achievement) return null;
      
      achievement.progress = Math.min(progress, achievement.maxProgress);
      
      if (achievement.progress >= achievement.maxProgress && !achievement.unlocked) {
        achievement.unlocked = true;
        achievement.unlockedDate = new Date().toISOString();
      }
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
      return achievement;
    } catch (error) {
      console.error('Error updating progress:', error);
      return null;
    }
  }

  async unlockAchievement(id: string): Promise<boolean> {
    try {
      const achievements = await this.getAchievements();
      const achievement = achievements.find(a => a.id === id);
      
      if (!achievement || achievement.unlocked) return false;
      
      achievement.unlocked = true;
      achievement.unlockedDate = new Date().toISOString();
      achievement.progress = achievement.maxProgress;
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
      return true;
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      return false;
    }
  }

  async getStats(): Promise<{ total: number; unlocked: number; points: number; totalPoints: number }> {
    const achievements = await this.getAchievements();
    const total = achievements.length;
    const unlocked = achievements.filter(a => a.unlocked).length;
    const points = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
    const totalPoints = achievements.reduce((sum, a) => sum + a.points, 0);
    
    return { total, unlocked, points, totalPoints };
  }

  async checkAchievements(type: 'injection' | 'lab' | 'cycle' | 'note', count: number): Promise<void> {
    // This would be called after each action to check and update progress
    if (type === 'injection') {
      await this.updateProgress('first_shot', count);
      await this.updateProgress('streak_7', count);
      await this.updateProgress('streak_30', count);
      await this.updateProgress('century', count);
    } else if (type === 'lab') {
      await this.updateProgress('lab_scientist', count);
      await this.updateProgress('data_keeper_10', count);
      await this.updateProgress('data_keeper_50', count);
    } else if (type === 'cycle') {
      await this.updateProgress('first_cycle', count);
      await this.updateProgress('cycle_historian_3', count);
      await this.updateProgress('expert_cyclist', count);
    }
  }
}

const AchievementsService = new AchievementsServiceClass();
export default AchievementsService;
