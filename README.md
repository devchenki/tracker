# Auth App

A React Native authentication application with animated splash screen, sign in, and sign up functionality.

## Features

- **Splash Screen** with React Native Reanimated animations
- **Sign In Screen** with form validation and error handling
- **Sign Up Screen** with comprehensive validation
- **Session Management** using AsyncStorage
- **Global Auth Context** for state management
- **Navigation** that responds to authentication state
- **Comprehensive Test Suite** with unit and integration tests

## Tech Stack

- React Native 0.73
- TypeScript
- React Native Paper (UI components)
- React Native Reanimated (animations)
- React Navigation (navigation)
- AsyncStorage (session persistence)
- Jest & React Testing Library (testing)

## Project Structure

```
.
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx          # Global authentication state
│   ├── navigation/
│   │   └── RootNavigator.tsx        # Navigation setup
│   ├── screens/
│   │   ├── SplashScreen.tsx         # Animated splash screen
│   │   ├── SignInScreen.tsx         # Sign in form
│   │   ├── SignUpScreen.tsx         # Sign up form
│   │   └── DashboardScreen.tsx      # Post-auth dashboard
│   ├── services/
│   │   └── AuthService.ts           # Authentication logic
│   └── types/
│       └── index.ts                 # TypeScript types
├── __tests__/
│   ├── AuthService.test.ts          # Service unit tests
│   ├── AuthContext.test.tsx         # Context tests
│   ├── AuthFlow.test.tsx            # Screen integration tests
│   └── e2e.test.tsx                 # End-to-end smoke tests
├── App.tsx                          # Root component
└── index.js                         # Entry point
```

## Installation

```bash
# Install dependencies
npm install

# iOS specific
cd ios && pod install && cd ..
```

## Running the App

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Authentication Flow

1. **Splash Screen**: Displays animated logo for 2.5 seconds
2. **Sign In/Sign Up**: User enters credentials with real-time validation
3. **Authentication**: AuthService processes credentials (currently mock implementation)
4. **Session Storage**: Token and user data saved to AsyncStorage
5. **Navigation**: App navigates to Dashboard on successful auth
6. **Session Persistence**: Session restored on app restart

## Validation Rules

### Sign In
- Email: Required, valid email format
- Password: Required, minimum 6 characters

### Sign Up
- Name: Required, minimum 2 characters
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Confirm Password: Required, must match password

## Mock Authentication

The AuthService currently uses mock authentication with a 1-second delay to simulate API calls. Replace the implementation in `src/services/AuthService.ts` with actual API calls for production use.

## License

MIT
