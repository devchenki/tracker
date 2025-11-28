# TrackerSteroid

A React Native Expo application with authentication, dashboard, and comprehensive feature set built with modern tooling and the Nord design system.

## Features

- **Splash Screen** with React Native Reanimated animations
- **Authentication** with Sign In, Sign Up, and session management
- **Dashboard** with insights, progress tracking, and overview
- **Courses** with modules, progress tracking, and detail views
- **Knowledge Base** with categories, articles, and search
- **Labs** with active experiments, queue, and history
- **Settings** with profile, security, notifications, and general preferences
- **Session Management** using AsyncStorage
- **Global Auth Context** for state management
- **Navigation** that responds to authentication state
- **Nord Theme** custom design system with Gluestack UI
- **Comprehensive Test Suite** with unit and integration tests

## Tech Stack

- **Expo SDK 53** (managed workflow)
- **React Native 0.76**
- **React 18.3**
- **TypeScript 5.x**
- **Gluestack UI** (UI component library)
- **React Native Reanimated** (animations)
- **React Navigation 6.x** (navigation)
- **AsyncStorage** (session persistence)
- **Expo Status Bar** (status bar styling)
- **Expo Splash Screen** (splash screen management)
- **Expo Local Authentication** (biometric auth ready)
- **Jest & React Testing Library** (testing)

## Design System

### Nord Theme

The app uses a custom Nord color palette theme that provides:

- **Polar Night**: Dark backgrounds and surfaces (nord0-nord3)
- **Snow Storm**: Light text and UI elements (nord4-nord6)
- **Frost**: Primary and accent colors (nord7-nord10)
- **Aurora**: Status colors (success, error, warning, info) (nord11-nord15)

Theme configuration is located in:
- `src/theme/nord.ts` - Nord color definitions and theme tokens
- `src/theme/gluestack.config.ts` - Gluestack UI theme configuration

### Typography & Spacing

- **Font sizes**: xs (12px) to xxxl (32px)
- **Spacing**: xs (4px) to xxl (48px)
- **Border radius**: sm (4px) to full (9999px)

## Project Structure

```
.
├── src/
│   ├── components/
│   │   └── ui/              # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Text.tsx
│   │       ├── Card.tsx
│   │       ├── Modal.tsx
│   │       └── Snackbar.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx  # Global authentication state
│   ├── navigation/
│   │   └── RootNavigator.tsx # Navigation setup
│   ├── screens/
│   │   ├── auth/            # Authentication screens
│   │   ├── dashboard/       # Dashboard screens
│   │   ├── courses/         # Course screens
│   │   ├── knowledge/       # Knowledge base screens
│   │   ├── labs/            # Lab screens
│   │   └── settings/        # Settings screens
│   ├── services/
│   │   └── AuthService.ts   # Authentication logic
│   ├── theme/
│   │   ├── nord.ts          # Nord theme definitions
│   │   └── gluestack.config.ts # Gluestack configuration
│   └── types/
│       └── index.ts         # TypeScript types
├── __tests__/               # Test files
├── App.tsx                  # Root component
└── app.json                 # Expo configuration
```

## Version History

### Current: Expo SDK 53
- **Expo SDK**: 53.0.0
- **React Native**: 0.76.5
- **React**: 18.3.1
- **TypeScript**: 5.3.3
- Updated all dependencies for SDK 53 compatibility
- Updated babel-preset-expo to 12.0.1
- Updated React Native Reanimated to 3.16.x
- Updated navigation libraries and expo modules

## Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# For iOS, install pods (if using bare workflow)
cd ios && pod install && cd ..
```

**Note**: Use `--legacy-peer-deps` flag due to peer dependency conflicts with some UI libraries.

## Running the App

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Prebuild native projects (if needed)
npm run prebuild
```

## Development

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm test

# Testing with watch mode
npm test -- --watch

# Testing with coverage
npm test -- --coverage
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

1. **Splash Screen**: Displays animated logo while checking for existing session
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

## Nord Color Palette

### Backgrounds
- **Primary**: `#ECEFF4` (nord6) - Main background
- **Surface**: `#E5E9F0` (nord5) - Cards, inputs
- **Card**: `#D8DEE9` (nord4) - Elevated surfaces

### Text
- **Primary**: `#2E3440` (nord0) - Main text
- **Secondary**: `#4C566A` (nord3) - Secondary text
- **Light**: `#434C5E` (nord2) - Tertiary text

### Accents
- **Primary**: `#81A1C1` (nord9) - Primary actions
- **Secondary**: `#A3BE8C` (nord14) - Secondary actions
- **Accent**: `#8FBCBB` (nord7) - Highlights

### Status
- **Error**: `#BF616A` (nord11) - Red
- **Success**: `#A3BE8C` (nord14) - Green
- **Warning**: `#EBCB8B` (nord13) - Yellow
- **Info**: `#88C0D0` (nord8) - Blue

## Mock Authentication

The AuthService currently uses mock authentication with a 1-second delay to simulate API calls. Replace the implementation in `src/services/AuthService.ts` with actual API calls for production use.

## Expo Features

- **Expo Go**: Use Expo Go app for quick development testing
- **EAS Build**: Ready for EAS Build cloud builds
- **OTA Updates**: Supports over-the-air updates with EAS Update
- **Local Authentication**: Biometric auth (Face ID, Touch ID) ready to implement

## License

MIT
