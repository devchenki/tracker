import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthResponse, SignInCredentials, SignUpCredentials } from '../types';

const STORAGE_KEY = '@auth_token';
const USER_KEY = '@auth_user';

class AuthService {
  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, password } = credentials;

        if (!email || !password) {
          reject(new Error('Email and password are required'));
          return;
        }

        if (password.length < 6) {
          reject(new Error('Invalid email or password'));
          return;
        }

        const user: User = {
          id: '1',
          email,
          name: email.split('@')[0],
        };

        const token = `mock_token_${Date.now()}`;

        resolve({ user, token });
      }, 1000);
    });
  }

  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { name, email, password, confirmPassword } = credentials;

        if (!name || !email || !password || !confirmPassword) {
          reject(new Error('All fields are required'));
          return;
        }

        if (password !== confirmPassword) {
          reject(new Error('Passwords do not match'));
          return;
        }

        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          reject(new Error('Invalid email format'));
          return;
        }

        const user: User = {
          id: '1',
          email,
          name,
        };

        const token = `mock_token_${Date.now()}`;

        resolve({ user, token });
      }, 1000);
    });
  }

  async saveSession(token: string, user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      throw new Error('Failed to save session');
    }
  }

  async getSession(): Promise<{ token: string; user: User } | null> {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEY);
      const userJson = await AsyncStorage.getItem(USER_KEY);

      if (token && userJson) {
        const user = JSON.parse(userJson);
        return { token, user };
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  async clearSession(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      throw new Error('Failed to clear session');
    }
  }

  async signOut(): Promise<void> {
    await this.clearSession();
  }
}

export default new AuthService();
