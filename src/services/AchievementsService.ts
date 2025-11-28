import { Achievement, AchievementsSummary, AchievementCategoryType } from '../types/achievements';

class AchievementsService {
  // Mock achievements data
  private achievements: Achievement[] = [
    // INJECTIONS
    {
      id: 'inj-1',
      title: 'First Shot',
      description: 'Запишите первую инъекцию',
      category: 'INJECTIONS',
      status: 'UNLOCKED',
      points: 10,
      unlockedDate: '2025-01-01',
      icon: '🎯',
    },
    {
      id: 'inj-2',
      title: 'Injection Streak - 7',
      description: 'Сделайте 7 инъекций подряд по расписанию',
      category: 'INJECTIONS',
      status: 'UNLOCKED',
      points: 50,
      progress: 7,
      maxProgress: 7,
      unlockedDate: '2025-01-08',
      icon: '💉',
    },
    {
      id: 'inj-3',
      title: 'Injection Streak - 30',
      description: 'Сделайте 30 инъекций подряд по расписанию',
      category: 'INJECTIONS',
      status: 'LOCKED',
      points: 200,
      progress: 12,
      maxProgress: 30,
      icon: '💉',
    },
    {
      id: 'inj-4',
      title: 'Century',
      description: 'Сделайте 100 инъекций',
      category: 'INJECTIONS',
      status: 'LOCKED',
      points: 500,
      progress: 47,
      maxProgress: 100,
      icon: '💪',
    },

    // LABS
    {
      id: 'lab-1',
      title: 'Lab Scientist',
      description: 'Добавьте первый лабораторный результат',
      category: 'LABS',
      status: 'UNLOCKED',
      points: 10,
      unlockedDate: '2025-01-05',
      icon: '🧪',
    },
    {
      id: 'lab-2',
      title: 'Data Keeper - 10',
      description: 'Добавьте 10 лабораторных результатов',
      category: 'LABS',
      status: 'UNLOCKED',
      points: 100,
      progress: 10,
      maxProgress: 10,
      unlockedDate: '2025-01-20',
      icon: '📊',
    },
    {
      id: 'lab-3',
      title: 'Data Keeper - 50',
      description: 'Добавьте 50 лабораторных результатов',
      category: 'LABS',
      status: 'LOCKED',
      points: 500,
      progress: 28,
      maxProgress: 50,
      icon: '📊',
    },

    // CYCLES
    {
      id: 'cyc-1',
      title: 'First Cycle',
      description: 'Завершите первый цикл',
      category: 'CYCLES',
      status: 'LOCKED',
      points: 200,
      progress: 41,
      maxProgress: 100,
      icon: '🚀',
    },
    {
      id: 'cyc-2',
      title: 'Cycle Historian - 3',
      description: 'Завершите 3 цикла',
      category: 'CYCLES',
      status: 'LOCKED',
      points: 300,
      progress: 0,
      maxProgress: 3,
      icon: '🔄',
    },
    {
      id: 'cyc-3',
      title: 'Expert Cyclist',
      description: 'Завершите 10 циклов',
      category: 'CYCLES',
      status: 'LOCKED',
      points: 1000,
      progress: 0,
      maxProgress: 10,
      icon: '🏆',
    },

    // CONSISTENCY
    {
      id: 'con-1',
      title: 'Week Warrior',
      description: 'Используйте приложение 7 дней подряд',
      category: 'CONSISTENCY',
      status: 'UNLOCKED',
      points: 75,
      unlockedDate: '2025-01-15',
      icon: '🔥',
    },
    {
      id: 'con-2',
      title: 'Month Master',
      description: 'Используйте приложение 30 дней подряд',
      category: 'CONSISTENCY',
      status: 'LOCKED',
      points: 300,
      progress: 23,
      maxProgress: 30,
      icon: '📅',
    },
    {
      id: 'con-3',
      title: 'Year Tracker',
      description: 'Используйте приложение 365 дней подряд',
      category: 'CONSISTENCY',
      status: 'LOCKED',
      points: 5000,
      progress: 23,
      maxProgress: 365,
      icon: '⭐',
    },

    // MILESTONES
    {
      id: 'mil-1',
      title: 'Knowledge Base Master',
      description: 'Прочитайте всю базу знаний',
      category: 'MILESTONES',
      status: 'LOCKED',
      points: 250,
      progress: 15,
      maxProgress: 28,
      icon: '💯',
    },
    {
      id: 'mil-2',
      title: 'All-In',
      description: 'Используйте все функции приложения',
      category: 'MILESTONES',
      status: 'LOCKED',
      points: 500,
      progress: 6,
      maxProgress: 8,
      icon: '🎖️',
    },
  ];

  async getAllAchievements(): Promise<Achievement[]> {
    // Simulate async API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.achievements);
      }, 300);
    });
  }

  async getAchievementsByCategory(category: AchievementCategoryType): Promise<Achievement[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.achievements.filter(a => a.category === category);
        resolve(filtered);
      }, 200);
    });
  }

  async getUnlockedAchievements(): Promise<Achievement[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const unlocked = this.achievements.filter(a => a.status === 'UNLOCKED');
        resolve(unlocked);
      }, 200);
    });
  }

  async getRecentAchievements(limit: number = 6): Promise<Achievement[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const unlocked = this.achievements
          .filter(a => a.status === 'UNLOCKED' && a.unlockedDate)
          .sort((a, b) => {
            const dateA = new Date(a.unlockedDate || 0);
            const dateB = new Date(b.unlockedDate || 0);
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, limit);
        resolve(unlocked);
      }, 200);
    });
  }

  async getAchievementsSummary(): Promise<AchievementsSummary> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const total = this.achievements.length;
        const unlocked = this.achievements.filter(a => a.status === 'UNLOCKED').length;
        const totalPoints = this.achievements
          .filter(a => a.status === 'UNLOCKED')
          .reduce((sum, a) => sum + a.points, 0);
        const maxPoints = this.achievements.reduce((sum, a) => sum + a.points, 0);
        const progressPercentage = Math.round((unlocked / total) * 100);

        resolve({
          totalAchievements: total,
          unlockedAchievements: unlocked,
          totalPoints,
          maxPoints,
          progressPercentage,
        });
      }, 200);
    });
  }

  async checkAchievements(action: string, data?: any): Promise<Achievement | null> {
    // This method would be called when users perform actions
    // Returns newly unlocked achievement if any
    // In a real app, this would update the backend and check conditions
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock logic - would contain actual achievement checking
        resolve(null);
      }, 100);
    });
  }
}

export default new AchievementsService();
