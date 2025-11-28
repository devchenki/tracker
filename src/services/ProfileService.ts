import { 
  UserProfile, 
  ProfileMetrics, 
  CurrentProgress, 
  ProfileStats 
} from '../types/profile';

class ProfileService {
  // Mock user profile
  private userProfile: UserProfile = {
    id: '1',
    name: 'Алексей Иванов',
    email: 'alexey@example.com',
    age: 28,
    weight: 92,
    height: 180,
    phone: '+7 (999) 123-45-67',
    status: 'Active',
    experienceLevel: 'Experienced',
    emailNotifications: true,
  };

  async getUserProfile(): Promise<UserProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.userProfile);
      }, 200);
    });
  }

  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.userProfile = { ...this.userProfile, ...updates };
        resolve(this.userProfile);
      }, 300);
    });
  }

  async getProfileMetrics(): Promise<ProfileMetrics> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalCycles: 3,
          totalInjections: 47,
          trackingDays: 156,
          achievementsUnlocked: 6,
          totalAchievements: 15,
        });
      }, 200);
    });
  }

  async getCurrentProgress(): Promise<CurrentProgress> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          weight: 92,
          weightChange: 3,
          benchPress: 120,
          squat: 150,
          deadlift: 180,
          bodyFat: 15,
          bodyFatChange: -2,
        });
      }, 200);
    });
  }

  async getProfileStats(): Promise<ProfileStats> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          mostActiveDay: 'Понедельник',
          longestStreak: 23,
          averageCycleLength: 12,
        });
      }, 200);
    });
  }

  async updateAvatar(avatarUri: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.userProfile.avatar = avatarUri;
        resolve(avatarUri);
      }, 300);
    });
  }

  async deleteAvatar(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.userProfile.avatar = undefined;
        resolve();
      }, 200);
    });
  }
}

export default new ProfileService();
