import React from 'react';
import { Text as GluestackText, Heading } from '@gluestack-ui/themed';
import { StyleSheet, TextStyle } from 'react-native';
import { NordTheme } from '../../theme/nord';

interface TextProps {
  children: React.ReactNode;
  variant?: 'headlineLarge' | 'headlineMedium' | 'headlineSmall' | 'titleLarge' | 'titleMedium' | 'titleSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'displayLarge' | 'displayMedium' | 'displaySmall';
  style?: TextStyle;
  numberOfLines?: number;
}

export const Text: React.FC<TextProps> = ({ 
  children,
  variant,
  style,
  numberOfLines,
  ...props 
}) => {
  const isHeadline = variant?.includes('headline') || variant?.includes('display');
  const isTitle = variant?.includes('title');

  const getFontSize = () => {
    switch (variant) {
      case 'displayLarge':
      case 'headlineLarge':
        return 32;
      case 'displayMedium':
      case 'headlineMedium':
        return 28;
      case 'displaySmall':
      case 'headlineSmall':
        return 24;
      case 'titleLarge':
        return 22;
      case 'titleMedium':
        return 18;
      case 'titleSmall':
        return 16;
      case 'bodyLarge':
        return 16;
      case 'bodyMedium':
        return 14;
      case 'bodySmall':
        return 12;
      case 'labelLarge':
        return 14;
      case 'labelMedium':
        return 12;
      case 'labelSmall':
        return 10;
      default:
        return 14;
    }
  };

  const textStyle = {
    fontSize: getFontSize(),
    fontWeight: (isHeadline || isTitle ? '700' : '400') as '400' | '700',
    color: NordTheme.colors.text,
  };

  if (isHeadline || isTitle) {
    return (
      <Heading style={[textStyle, style]} numberOfLines={numberOfLines} {...props}>
        {children}
      </Heading>
    );
  }

  return (
    <GluestackText style={[textStyle, style]} numberOfLines={numberOfLines} {...props}>
      {children}
    </GluestackText>
  );
};
