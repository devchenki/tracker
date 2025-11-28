export interface Cycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  currentDay?: number;
  totalDays?: number;
  duration: number;
  status: 'active' | 'completed' | 'planned';
  progress: number;
  compounds: Compound[];
  injections: number;
  completedInjections: number;
  notes?: string;
}

export interface Compound {
  id: string;
  name: string;
  dosage: number;
  unit: string;
  frequency: string;
}

export interface Injection {
  id: string;
  compound: string;
  dosage: number;
  unit: string;
  scheduledDate: string;
  scheduledTime: string;
  site: string;
  status: 'pending' | 'due' | 'overdue' | 'completed';
}

export interface LabResult {
  id: string;
  testName: string;
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
  };
  status: 'normal' | 'warning' | 'critical';
  date: string;
}

export interface HealthMetrics {
  weight: number;
  bodyFat: number;
  muscleMass: number;
  strength: {
    bench: number;
    squat: number;
    deadlift: number;
  };
  lastUpdated: string;
}

export interface WeightDataPoint {
  date: string;
  value: number;
  label: string;
}

export interface HormoneDataPoint {
  date: string;
  testosterone: number;
  estradiol: number;
  label: string;
}

export interface DashboardData {
  activeCycle: Cycle | null;
  nextInjection: Injection | null;
  latestLabResults: LabResult[];
  healthMetrics: HealthMetrics | null;
  weightHistory: WeightDataPoint[];
  hormoneHistory: HormoneDataPoint[];
}
