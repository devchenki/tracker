export interface ProgressData {
  label: string;
  value: number;
}

export interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

export interface LearningStats {
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  streak: number;
}

export class ProgressService {
  static getWeeklyProgress(): ProgressData[] {
    return [
      { label: 'Mon', value: 45 },
      { label: 'Tue', value: 60 },
      { label: 'Wed', value: 30 },
      { label: 'Thu', value: 75 },
      { label: 'Fri', value: 50 },
      { label: 'Sat', value: 90 },
      { label: 'Sun', value: 65 },
    ];
  }

  static getCourseProgress(): CourseProgress[] {
    return [
      {
        id: '1',
        title: 'React Native Fundamentals',
        progress: 75,
        completedLessons: 15,
        totalLessons: 20,
      },
      {
        id: '2',
        title: 'Advanced TypeScript',
        progress: 45,
        completedLessons: 9,
        totalLessons: 20,
      },
      {
        id: '3',
        title: 'Mobile UI/UX Design',
        progress: 90,
        completedLessons: 18,
        totalLessons: 20,
      },
      {
        id: '4',
        title: 'State Management',
        progress: 30,
        completedLessons: 6,
        totalLessons: 20,
      },
    ];
  }

  static getLearningStats(): LearningStats {
    return {
      totalCourses: 12,
      completedCourses: 3,
      totalHours: 48,
      streak: 7,
    };
  }

  static getCategoryDistribution(): ProgressData[] {
    return [
      { label: 'Development', value: 45 },
      { label: 'Design', value: 25 },
      { label: 'Testing', value: 15 },
      { label: 'DevOps', value: 15 },
    ];
  }
}
