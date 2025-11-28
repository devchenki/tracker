import { Cycle } from '../types/dashboard';

class CoursesServiceClass {
  private mockCycles: Cycle[] = [
    {
      id: 'course1',
      name: 'Test E 500',
      startDate: '2025-01-01',
      endDate: '2025-03-01',
      duration: 56,
      status: 'active',
      compounds: [
        {
          id: '1',
          name: 'Testosterone Enanthate',
          dosage: 500,
          unit: 'mg',
          frequency: 'weekly',
        },
      ],
      injections: 8,
      completedInjections: 3,
      progress: 41,
      currentDay: 23,
      totalDays: 56,
      notes: 'Основной цикл',
    },
    {
      id: 'course2',
      name: 'NPP Stack',
      startDate: '2024-10-01',
      endDate: '2024-12-15',
      duration: 56,
      status: 'completed',
      compounds: [
        {
          id: '2',
          name: 'NPP',
          dosage: 300,
          unit: 'mg',
          frequency: 'eod',
        },
        {
          id: '3',
          name: 'Testosterone Base',
          dosage: 100,
          unit: 'mg',
          frequency: 'daily',
        },
      ],
      injections: 24,
      completedInjections: 24,
      progress: 100,
      currentDay: 56,
      totalDays: 56,
    },
    {
      id: 'course3',
      name: 'Summer Cut',
      startDate: '2025-06-01',
      endDate: '2025-07-26',
      duration: 42,
      status: 'planned',
      compounds: [
        {
          id: '4',
          name: 'Trenbolone Acetate',
          dosage: 350,
          unit: 'mg',
          frequency: 'eod',
        },
        {
          id: '5',
          name: 'Testosterone Propionate',
          dosage: 400,
          unit: 'mg',
          frequency: 'eod',
        },
      ],
      injections: 21,
      completedInjections: 0,
      progress: 0,
      currentDay: 0,
      totalDays: 42,
      notes: 'Запланирован на лето',
    },
  ];

  async getActiveCycle(): Promise<Cycle | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeCycle = this.mockCycles.find((c) => c.status === 'active');
        resolve(activeCycle || null);
      }, 500);
    });
  }

  async getAllCycles(): Promise<Cycle[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockCycles);
      }, 500);
    });
  }

  async getCycleById(id: string): Promise<Cycle | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cycle = this.mockCycles.find((c) => c.id === id);
        resolve(cycle || null);
      }, 500);
    });
  }

  async getCyclesByStatus(status: 'active' | 'completed' | 'planned'): Promise<Cycle[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cycles = this.mockCycles.filter((c) => c.status === status);
        resolve(cycles);
      }, 500);
    });
  }

  async searchCycles(query: string): Promise<Cycle[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        const cycles = this.mockCycles.filter((c) =>
          c.name.toLowerCase().includes(lowerQuery)
        );
        resolve(cycles);
      }, 500);
    });
  }

  async deleteCycle(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.mockCycles.findIndex((c) => c.id === id);
        if (index > -1) {
          this.mockCycles.splice(index, 1);
        }
        resolve();
      }, 500);
    });
  }

  async completeCycle(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cycle = this.mockCycles.find((c) => c.id === id);
        if (cycle) {
          cycle.status = 'completed';
          cycle.progress = 100;
          cycle.completedInjections = cycle.injections;
        }
        resolve();
      }, 500);
    });
  }
}

const CoursesService = new CoursesServiceClass();
export default CoursesService;
