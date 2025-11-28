import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    NavigationContainer: ({ children }: any) => children,
  };
});

describe('End-to-End Auth Flow Smoke Test', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    jest.clearAllMocks();
  });

  it('should complete full sign up flow', async () => {
    const { getByText, getByLabelText, queryByText } = render(<App />);

    await waitFor(() => {
      expect(queryByText('Sign In')).toBeTruthy();
    }, { timeout: 3000 });

    const signUpLink = getByText("Don't have an account? Sign Up");
    fireEvent.press(signUpLink);

    await waitFor(() => {
      expect(getByText('Sign Up')).toBeTruthy();
    });

    const nameInput = getByLabelText('Name');
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const confirmPasswordInput = getByLabelText('Confirm Password');

    fireEvent.changeText(nameInput, 'Test User');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');

    const signUpButton = getByText('Sign Up');
    fireEvent.press(signUpButton);

    await waitFor(
      () => {
        expect(getByText('Dashboard')).toBeTruthy();
        expect(getByText('Welcome, Test User!')).toBeTruthy();
      },
      { timeout: 3000 }
    );

    const session = await AsyncStorage.getItem('@auth_token');
    expect(session).toBeTruthy();
  });

  it('should complete full sign in flow', async () => {
    const { getByText, getByLabelText, queryByText } = render(<App />);

    await waitFor(() => {
      expect(queryByText('Sign In')).toBeTruthy();
    }, { timeout: 3000 });

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(
      () => {
        expect(getByText('Dashboard')).toBeTruthy();
        expect(getByText(/Welcome,/)).toBeTruthy();
      },
      { timeout: 3000 }
    );

    const session = await AsyncStorage.getItem('@auth_token');
    expect(session).toBeTruthy();
  });

  it('should sign out and clear session', async () => {
    const { getByText, getByLabelText, queryByText } = render(<App />);

    await waitFor(() => {
      expect(queryByText('Sign In')).toBeTruthy();
    }, { timeout: 3000 });

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const signInButton = getByText('Sign In');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(signInButton);

    await waitFor(
      () => {
        expect(getByText('Dashboard')).toBeTruthy();
      },
      { timeout: 3000 }
    );

    const signOutButton = getByText('Sign Out');
    fireEvent.press(signOutButton);

    await waitFor(
      () => {
        expect(queryByText('Sign In')).toBeTruthy();
      },
      { timeout: 1000 }
    );

    const session = await AsyncStorage.getItem('@auth_token');
    expect(session).toBeNull();
  });

  it('should persist session across app restarts', async () => {
    const user = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    };
    const token = 'test_token_123';

    await AsyncStorage.setItem('@auth_token', token);
    await AsyncStorage.setItem('@auth_user', JSON.stringify(user));

    const { getByText, queryByText } = render(<App />);

    await waitFor(
      () => {
        expect(getByText('Dashboard')).toBeTruthy();
        expect(getByText('Welcome, Test User!')).toBeTruthy();
      },
      { timeout: 2000 }
    );

    expect(queryByText('Sign In')).toBeNull();
  });

  it('should handle validation errors in sign up', async () => {
    const { getByText, getByLabelText, queryByText } = render(<App />);

    await waitFor(() => {
      expect(queryByText('Sign In')).toBeTruthy();
    }, { timeout: 3000 });

    const signUpLink = getByText("Don't have an account? Sign Up");
    fireEvent.press(signUpLink);

    await waitFor(() => {
      expect(getByText('Sign Up')).toBeTruthy();
    });

    const signUpButton = getByText('Sign Up');
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(getByText('Name is required')).toBeTruthy();
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });

  it('should handle validation errors in sign in', async () => {
    const { getByText, queryByText } = render(<App />);

    await waitFor(() => {
      expect(queryByText('Sign In')).toBeTruthy();
    }, { timeout: 3000 });

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });
});
