import AuthService from '../src/services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('AuthService', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  describe('signIn', () => {
    it('should successfully sign in with valid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await AuthService.signIn(credentials);

      expect(response.user).toBeDefined();
      expect(response.user.email).toBe(credentials.email);
      expect(response.token).toBeDefined();
      expect(response.token).toContain('mock_token_');
    });

    it('should reject sign in with empty email', async () => {
      const credentials = {
        email: '',
        password: 'password123',
      };

      await expect(AuthService.signIn(credentials)).rejects.toThrow(
        'Email and password are required'
      );
    });

    it('should reject sign in with empty password', async () => {
      const credentials = {
        email: 'test@example.com',
        password: '',
      };

      await expect(AuthService.signIn(credentials)).rejects.toThrow(
        'Email and password are required'
      );
    });

    it('should reject sign in with short password', async () => {
      const credentials = {
        email: 'test@example.com',
        password: '12345',
      };

      await expect(AuthService.signIn(credentials)).rejects.toThrow(
        'Invalid email or password'
      );
    });
  });

  describe('signUp', () => {
    it('should successfully sign up with valid credentials', async () => {
      const credentials = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      const response = await AuthService.signUp(credentials);

      expect(response.user).toBeDefined();
      expect(response.user.name).toBe(credentials.name);
      expect(response.user.email).toBe(credentials.email);
      expect(response.token).toBeDefined();
    });

    it('should reject sign up with missing fields', async () => {
      const credentials = {
        name: '',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };

      await expect(AuthService.signUp(credentials)).rejects.toThrow(
        'All fields are required'
      );
    });

    it('should reject sign up with mismatched passwords', async () => {
      const credentials = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password456',
      };

      await expect(AuthService.signUp(credentials)).rejects.toThrow(
        'Passwords do not match'
      );
    });

    it('should reject sign up with short password', async () => {
      const credentials = {
        name: 'Test User',
        email: 'test@example.com',
        password: '12345',
        confirmPassword: '12345',
      };

      await expect(AuthService.signUp(credentials)).rejects.toThrow(
        'Password must be at least 6 characters'
      );
    });

    it('should reject sign up with invalid email format', async () => {
      const credentials = {
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123',
        confirmPassword: 'password123',
      };

      await expect(AuthService.signUp(credentials)).rejects.toThrow(
        'Invalid email format'
      );
    });
  });

  describe('session management', () => {
    it('should save session to AsyncStorage', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };
      const token = 'test_token_123';

      await AuthService.saveSession(token, user);

      const savedToken = await AsyncStorage.getItem('@auth_token');
      const savedUser = await AsyncStorage.getItem('@auth_user');

      expect(savedToken).toBe(token);
      expect(JSON.parse(savedUser!)).toEqual(user);
    });

    it('should retrieve session from AsyncStorage', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };
      const token = 'test_token_123';

      await AuthService.saveSession(token, user);
      const session = await AuthService.getSession();

      expect(session).toBeDefined();
      expect(session!.token).toBe(token);
      expect(session!.user).toEqual(user);
    });

    it('should return null when no session exists', async () => {
      const session = await AuthService.getSession();
      expect(session).toBeNull();
    });

    it('should clear session from AsyncStorage', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };
      const token = 'test_token_123';

      await AuthService.saveSession(token, user);
      await AuthService.clearSession();

      const session = await AuthService.getSession();
      expect(session).toBeNull();
    });

    it('should sign out and clear session', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };
      const token = 'test_token_123';

      await AuthService.saveSession(token, user);
      await AuthService.signOut();

      const session = await AuthService.getSession();
      expect(session).toBeNull();
    });
  });
});
