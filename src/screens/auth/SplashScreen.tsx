import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import { AppTheme } from '../../theme/colors';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const logoRotate = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, {
      damping: 12,
      stiffness: 90,
    });

    logoRotate.value = withSequence(
      withTiming(360, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      withTiming(360, { duration: 100 })
    );

    opacity.value = withSequence(
      withTiming(1, { duration: 600 }),
      withDelay(1400, withTiming(1, { duration: 200 })),
      withTiming(0, { duration: 400 })
    );

    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
    });

    const timer = setTimeout(() => {
      navigation.replace('SignIn');
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigation, scale, opacity, translateY, logoRotate]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { rotate: `${logoRotate.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const subtitleStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <View style={styles.logoContainer}>
          <Text variant="displayLarge" style={styles.logo}>
            📚
          </Text>
        </View>
        <Text variant="displayMedium" style={styles.title}>
          LearningHub
        </Text>
      </Animated.View>
      <Animated.View style={[styles.subtitleContainer, subtitleStyle]}>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Your journey to knowledge
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.primary,
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    fontSize: 80,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitleContainer: {
    marginTop: 24,
  },
  subtitle: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
});

export default SplashScreen;
