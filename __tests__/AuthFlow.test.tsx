import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import SignInScreen from '../src/screens/SignInScreen';
import SignUpScreen from '../src/screens/SignUpScreen';
import { AuthProvider } from '../src/contexts/AuthContext';

const mockNavigate = jest.fn();
const mockReplace = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      replace: mockReplace,
    }),
  };
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>{children}</AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

describe('Authentication Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('SignInScreen', () => {
    it('should render sign in form', () => {
      const { getByText, getByLabelText } = render(<SignInScreen />, {
        wrapper: AllTheProviders,
      });

      expect(getByText('Sign In')).toBeTruthy();
      expect(getByLabelText('Email')).toBeTruthy();
      expect(getByLabelText('Password')).toBeTruthy();
    });

    it('should show validation errors for empty fields', async () => {
      const { getByText } = render(<SignInScreen />, {
        wrapper: AllTheProviders,
      });

      const signInButton = getByText('Sign In');
      fireEvent.press(signInButton);

      await waitFor(() => {
        expect(getByText('Email is required')).toBeTruthy();
        expect(getByText('Password is required')).toBeTruthy();
      });
    });

    it('should show validation error for invalid email', async () => {
      const { getByText, getByLabelText } = render(<SignInScreen />, {
        wrapper: AllTheProviders,
      });

      const emailInput = getByLabelText('Email');
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent(emailInput, 'blur');

      await waitFor(() => {
        expect(getByText('Invalid email format')).toBeTruthy();
      });
    });

    it('should show validation error for short password', async () => {
      const { getByText, getByLabelText } = render(<SignInScreen />, {
        wrapper: AllTheProviders,
      });

      const passwordInput = getByLabelText('Password');
      fireEvent.changeText(passwordInput, '12345');
      fireEvent(passwordInput, 'blur');

      await waitFor(() => {
        expect(getByText('Password must be at least 6 characters')).toBeTruthy();
      });
    });

    it('should successfully sign in with valid credentials', async () => {
      const { getByText, getByLabelText } = render(<SignInScreen />, {
        wrapper: AllTheProviders,
      });

      const emailInput = getByLabelText('Email');
      const passwordInput = getByLabelText('Password');
      const signInButton = getByText('Sign In');

      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.press(signInButton);

      await waitFor(
        () => {
          expect(getByText('Sign In')).toBeTruthy();
        },
        { timeout: 2000 }
      );
    });

    it('should navigate to sign up screen', () => {
      const { getByText } = render(<SignInScreen />, {
        wrapper: AllTheProviders,
      });

      const signUpLink = getByText("Don't have an account? Sign Up");
      fireEvent.press(signUpLink);

      expect(mockNavigate).toHaveBeenCalledWith('SignUp');
    });
  });

  describe('SignUpScreen', () => {
    it('should render sign up form', () => {
      const { getByText, getByLabelText } = render(<SignUpScreen />, {
        wrapper: AllTheProviders,
      });

      expect(getByText('Sign Up')).toBeTruthy();
      expect(getByLabelText('Name')).toBeTruthy();
      expect(getByLabelText('Email')).toBeTruthy();
      expect(getByLabelText('Password')).toBeTruthy();
      expect(getByLabelText('Confirm Password')).toBeTruthy();
    });

    it('should show validation errors for empty fields', async () => {
      const { getByText } = render(<SignUpScreen />, {
        wrapper: AllTheProviders,
      });

      const signUpButton = getByText('Sign Up');
      fireEvent.press(signUpButton);

      await waitFor(() => {
        expect(getByText('Name is required')).toBeTruthy();
        expect(getByText('Email is required')).toBeTruthy();
        expect(getByText('Password is required')).toBeTruthy();
        expect(getByText('Please confirm your password')).toBeTruthy();
      });
    });

    it('should show validation error for mismatched passwords', async () => {
      const { getByText, getByLabelText } = render(<SignUpScreen />, {
        wrapper: AllTheProviders,
      });

      const passwordInput = getByLabelText('Password');
      const confirmPasswordInput = getByLabelText('Confirm Password');

      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.changeText(confirmPasswordInput, 'password456');
      fireEvent(confirmPasswordInput, 'blur');

      await waitFor(() => {
        expect(getByText('Passwords do not match')).toBeTruthy();
      });
    });

    it('should show validation error for invalid email', async () => {
      const { getByText, getByLabelText } = render(<SignUpScreen />, {
        wrapper: AllTheProviders,
      });

      const emailInput = getByLabelText('Email');
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent(emailInput, 'blur');

      await waitFor(() => {
        expect(getByText('Invalid email format')).toBeTruthy();
      });
    });

    it('should successfully sign up with valid credentials', async () => {
      const { getByText, getByLabelText } = render(<SignUpScreen />, {
        wrapper: AllTheProviders,
      });

      const nameInput = getByLabelText('Name');
      const emailInput = getByLabelText('Email');
      const passwordInput = getByLabelText('Password');
      const confirmPasswordInput = getByLabelText('Confirm Password');
      const signUpButton = getByText('Sign Up');

      fireEvent.changeText(nameInput, 'Test User');
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
      fireEvent.changeText(confirmPasswordInput, 'password123');
      fireEvent.press(signUpButton);

      await waitFor(
        () => {
          expect(getByText('Sign Up')).toBeTruthy();
        },
        { timeout: 2000 }
      );
    });

    it('should navigate to sign in screen', () => {
      const { getByText } = render(<SignUpScreen />, {
        wrapper: AllTheProviders,
      });

      const signInLink = getByText('Already have an account? Sign In');
      fireEvent.press(signInLink);

      expect(mockNavigate).toHaveBeenCalledWith('SignIn');
    });
  });
});
