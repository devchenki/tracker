import React from 'react';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { gluestackConfig } from './src/theme/gluestack.config';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider config={gluestackConfig}>
        <SafeAreaProvider>
          <StatusBar style="dark" backgroundColor="#ECEFF4" />
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
};

export default App;
