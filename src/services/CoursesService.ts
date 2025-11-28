import { Cycle } from '../types/dashboard';

class CoursesServiceClass {
  private mockCycle: Cycle = {
    id: '1',
    name: 'Test Cycle',
    startDate: '2024-01-01',
    endDate: '2024-02-26',
    currentDay: 23,
    totalDays: 56,
    progress: 41,
    compounds: [
      {
        id: '1',
        name: 'Testosterone Enanthate',
        dosage: 500,
        unit: 'mg',
        frequency: '2x week',
      },
      {
        id: '2',
        name: 'Deca Durabolin',
        dosage: 300,
        unit: 'mg',
        frequency: '2x week',
      },
    ],
  };

  async getActiveCycle(): Promise<Cycle | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockCycle);
      }, 500);
    });
  }

  async getAllCycles(): Promise<Cycle[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([this.mockCycle]);
      }, 500);
    });
  }

  async getCycleById(id: string): Promise<Cycle | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (id === this.mockCycle.id) {
          resolve(this.mockCycle);
        } else {
          resolve(null);
        }
      }, 500);
    });
  }
}

const CoursesService = new CoursesServiceClass();
export default CoursesService;
