import { HealthMetrics, WeightDataPoint } from '../types/dashboard';

class HealthMetricsServiceClass {
  private mockMetrics: HealthMetrics = {
    weight: 92,
    bodyFat: 15,
    muscleMass: 78,
    strength: {
      bench: 140,
      squat: 180,
      deadlift: 220,
    },
    lastUpdated: new Date().toISOString().split('T')[0],
  };

  async getHealthMetrics(): Promise<HealthMetrics | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockMetrics);
      }, 300);
    });
  }

  async getWeightHistory(days: number = 30): Promise<WeightDataPoint[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const history: WeightDataPoint[] = [];
        const now = Date.now();
        const interval = Math.floor(days / 10);
        
        for (let i = 9; i >= 0; i--) {
          const date = new Date(now - i * interval * 24 * 60 * 60 * 1000);
          const dayLabel = date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' });
          
          history.push({
            date: date.toISOString().split('T')[0],
            value: 87 + (9 - i) * 0.5 + Math.random() * 0.5,
            label: dayLabel,
          });
        }
        
        resolve(history);
      }, 300);
    });
  }

  async updateHealthMetrics(metrics: Partial<HealthMetrics>): Promise<HealthMetrics> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.mockMetrics = {
          ...this.mockMetrics,
          ...metrics,
          lastUpdated: new Date().toISOString().split('T')[0],
        };
        resolve(this.mockMetrics);
      }, 300);
    });
  }
}

const HealthMetricsService = new HealthMetricsServiceClass();
export default HealthMetricsService;
