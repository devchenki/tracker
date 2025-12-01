import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Tablet {
  id: string;
  compound: string;
  dosage: number;
  unit: string;
  scheduledDate: string;
  scheduledTime: string;
  cycleId?: string;
  notes?: string;
  status: 'pending' | 'completed';
}

const STORAGE_KEY = '@trackersteroid_tablets';

class TabletServiceClass {
  async logTablet(tablet: Partial<Tablet>): Promise<Tablet> {
    try {
      const tablets = await this.getTablets();
      const newTablet: Tablet = {
        id: Date.now().toString(),
        compound: tablet.compound || '',
        dosage: tablet.dosage || 0,
        unit: tablet.unit || 'mg',
        scheduledDate: tablet.scheduledDate || new Date().toISOString().split('T')[0],
        scheduledTime: tablet.scheduledTime || new Date().toTimeString().slice(0, 5),
        cycleId: tablet.cycleId,
        notes: tablet.notes,
        status: 'completed',
      };
      tablets.push(newTablet);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tablets));
      return newTablet;
    } catch (error) {
      console.error('Error logging tablet:', error);
      throw error;
    }
  }

  async getTablets(): Promise<Tablet[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting tablets:', error);
      return [];
    }
  }

  async getTabletsByDate(date: string): Promise<Tablet[]> {
    const tablets = await this.getTablets();
    return tablets.filter(t => t.scheduledDate === date);
  }

  async getTabletsByCompound(compound: string): Promise<Tablet[]> {
    const tablets = await this.getTablets();
    return tablets.filter(t => t.compound.toLowerCase().includes(compound.toLowerCase()));
  }
}

const TabletService = new TabletServiceClass();
export default TabletService;
