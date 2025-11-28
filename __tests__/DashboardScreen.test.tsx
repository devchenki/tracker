import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import DashboardScreen from '../src/screens/dashboard/DashboardScreen';
import { AuthProvider } from '../src/contexts/AuthContext';

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-gifted-charts', () => ({
  LineChart: 'LineChart',
}));

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('DashboardScreen', () => {
  it('renders loading state initially', () => {
    const { getByText } = render(
      <DashboardScreen navigation={mockNavigation as any} />,
      { wrapper }
    );
    
    expect(getByText('Загрузка...')).toBeTruthy();
  });

  it('renders dashboard content after loading', async () => {
    const { getByText, queryByText } = render(
      <DashboardScreen navigation={mockNavigation as any} />,
      { wrapper }
    );
    
    await waitFor(() => {
      expect(queryByText('Загрузка...')).toBeNull();
    });
    
    expect(getByText(/Привет,/)).toBeTruthy();
  });

  it('renders active cycle card', async () => {
    const { getByText } = render(
      <DashboardScreen navigation={mockNavigation as any} />,
      { wrapper }
    );
    
    await waitFor(() => {
      expect(getByText('Активный цикл')).toBeTruthy();
    });
    
    expect(getByText('Test Cycle')).toBeTruthy();
  });

  it('renders next injection card', async () => {
    const { getByText } = render(
      <DashboardScreen navigation={mockNavigation as any} />,
      { wrapper }
    );
    
    await waitFor(() => {
      expect(getByText('Предстоящая инъекция')).toBeTruthy();
    });
    
    expect(getByText('Testosterone Enanthate')).toBeTruthy();
  });

  it('renders lab results card', async () => {
    const { getByText } = render(
      <DashboardScreen navigation={mockNavigation as any} />,
      { wrapper }
    );
    
    await waitFor(() => {
      expect(getByText('Последние результаты анализов')).toBeTruthy();
    });
    
    expect(getByText('Testosterone')).toBeTruthy();
  });

  it('renders health metrics card', async () => {
    const { getByText } = render(
      <DashboardScreen navigation={mockNavigation as any} />,
      { wrapper }
    );
    
    await waitFor(() => {
      expect(getByText('Показатели здоровья')).toBeTruthy();
    });
    
    expect(getByText(/92 кг/)).toBeTruthy();
  });

  it('renders quick actions', async () => {
    const { getByText } = render(
      <DashboardScreen navigation={mockNavigation as any} />,
      { wrapper }
    );
    
    await waitFor(() => {
      expect(getByText('Быстрые действия')).toBeTruthy();
    });
    
    expect(getByText('Инъекция')).toBeTruthy();
    expect(getByText('Анализ')).toBeTruthy();
    expect(getByText('Заметка')).toBeTruthy();
    expect(getByText('Измерение')).toBeTruthy();
  });
});
