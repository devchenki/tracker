import { LabResult, HormoneDataPoint } from '../types/dashboard';

class LabsServiceClass {
  private mockLabResults: LabResult[] = [
    {
      id: '1',
      testName: 'Testosterone',
      value: 650,
      unit: 'ng/dL',
      referenceRange: { min: 300, max: 1000 },
      status: 'normal',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    {
      id: '2',
      testName: 'Estradiol',
      value: 35,
      unit: 'pg/mL',
      referenceRange: { min: 10, max: 40 },
      status: 'normal',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    {
      id: '3',
      testName: 'LH',
      value: 0.5,
      unit: 'mIU/mL',
      referenceRange: { min: 1.5, max: 9.3 },
      status: 'critical',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    {
      id: '4',
      testName: 'FSH',
      value: 0.3,
      unit: 'mIU/mL',
      referenceRange: { min: 1.4, max: 18.1 },
      status: 'critical',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  ];

  async getLatestLabResults(limit: number = 3): Promise<LabResult[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sorted = [...this.mockLabResults].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        resolve(sorted.slice(0, limit));
      }, 300);
    });
  }

  async getAllLabResults(): Promise<LabResult[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockLabResults);
      }, 300);
    });
  }

  async getHormoneHistory(days: number = 90): Promise<HormoneDataPoint[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const history: HormoneDataPoint[] = [];
        const now = Date.now();
        const interval = Math.floor(days / 6);
        
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now - i * interval * 24 * 60 * 60 * 1000);
          const dayLabel = date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' });
          
          history.push({
            date: date.toISOString().split('T')[0],
            testosterone: 400 + i * 40 + Math.random() * 50,
            estradiol: 25 + i * 2 + Math.random() * 5,
            label: dayLabel,
          });
        }
        
        resolve(history);
      }, 300);
    });
  }

  async addLabResult(result: Partial<LabResult>): Promise<LabResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newResult: LabResult = {
          id: Date.now().toString(),
          testName: result.testName || '',
          value: result.value || 0,
          unit: result.unit || '',
          referenceRange: result.referenceRange || { min: 0, max: 0 },
          status: result.status || 'normal',
          date: result.date || new Date().toISOString().split('T')[0],
        };
        resolve(newResult);
      }, 300);
    });
  }
}

const LabsService = new LabsServiceClass();
export default LabsService;
