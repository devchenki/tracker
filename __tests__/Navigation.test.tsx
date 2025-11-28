import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../src/contexts/AuthContext';
import RootNavigator from '../src/navigation/RootNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show splash screen initially', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { getByText } = render(
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByText('LearningHub')).toBeTruthy();
    });
  });

  it('should navigate to SignIn after splash', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { findByText } = render(
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    );

    await waitFor(
      async () => {
        const signInText = await findByText('Sign In');
        expect(signInText).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it('should show tab navigator when authenticated', async () => {
    const mockToken = 'mock-token';
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    };

    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'auth_token') return Promise.resolve(mockToken);
      if (key === 'user_data') return Promise.resolve(JSON.stringify(mockUser));
      return Promise.resolve(null);
    });

    const { findByText } = render(
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    );

    await waitFor(
      async () => {
        const dashboardText = await findByText(/Welcome back/i);
        expect(dashboardText).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it('should render all five tabs when authenticated', async () => {
    const mockToken = 'mock-token';
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    };

    (AsyncStorage.getItem as jest.Mock).mockImplementation((key) => {
      if (key === 'auth_token') return Promise.resolve(mockToken);
      if (key === 'user_data') return Promise.resolve(JSON.stringify(mockUser));
      return Promise.resolve(null);
    });

    const { findByText } = render(
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    );

    await waitFor(
      async () => {
        expect(await findByText('Dashboard')).toBeTruthy();
        expect(await findByText('Courses')).toBeTruthy();
        expect(await findByText('Knowledge')).toBeTruthy();
        expect(await findByText('Labs')).toBeTruthy();
        expect(await findByText('Settings')).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });
});
