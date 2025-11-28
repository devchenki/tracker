import AsyncStorage from '@react-native-async-storage/async-storage';
import { Injection } from '../types/dashboard';

const STORAGE_KEY = '@trackersteroid_injections';

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

  async getInjections(): Promise<Injection[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting injections:', error);
      return [];
    }
  }

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

  async getInjectionsByDate(date: string): Promise<Injection[]> {
    const injections = await this.getInjections();
    return injections.filter(inj => inj.scheduledDate === date);
  }

  async getInjectionsByCompound(compound: string): Promise<Injection[]> {
    const injections = await this.getInjections();
    return injections.filter(inj => inj.compound.toLowerCase().includes(compound.toLowerCase()));
  }

  async logInjection(injection: Partial<Injection>): Promise<Injection> {
    try {
      const injections = await this.getInjections();
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
      injections.push(newInjection);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(injections));
      return newInjection;
    } catch (error) {
      console.error('Error logging injection:', error);
      throw error;
    }
  }
}

const InjectionsService = new InjectionsServiceClass();
export default InjectionsService;
