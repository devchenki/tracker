import { Injection } from '../types/dashboard';

class InjectionsServiceClass {
  private mockInjections: Injection[] = [
    {
      id: '1',
      compound: 'Testosterone Enanthate',
      dosage: 500,
      unit: 'mg',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTime: '18:00',
      site: 'Правая ягодица',
      status: 'due',
    },
    {
      id: '2',
      compound: 'Deca Durabolin',
      dosage: 300,
      unit: 'mg',
      scheduledDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      scheduledTime: '18:00',
      site: 'Левая ягодица',
      status: 'pending',
    },
  ];

  async getNextInjection(): Promise<Injection | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sortedInjections = [...this.mockInjections].sort((a, b) => {
          const dateA = new Date(`${a.scheduledDate}T${a.scheduledTime}`);
          const dateB = new Date(`${b.scheduledDate}T${b.scheduledTime}`);
          return dateA.getTime() - dateB.getTime();
        });
        resolve(sortedInjections[0] || null);
      }, 300);
    });
  }

  async getUpcomingInjections(): Promise<Injection[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockInjections);
      }, 300);
    });
  }

  async logInjection(injection: Partial<Injection>): Promise<Injection> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newInjection: Injection = {
          id: Date.now().toString(),
          compound: injection.compound || '',
          dosage: injection.dosage || 0,
          unit: injection.unit || 'mg',
          scheduledDate: injection.scheduledDate || new Date().toISOString().split('T')[0],
          scheduledTime: injection.scheduledTime || '12:00',
          site: injection.site || '',
          status: 'completed',
        };
        resolve(newInjection);
      }, 300);
    });
  }
}

const InjectionsService = new InjectionsServiceClass();
export default InjectionsService;
