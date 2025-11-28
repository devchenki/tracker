import React from 'react';
import { Button as GluestackButton, ButtonText } from '@gluestack-ui/themed';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { NordTheme } from '../../theme/nord';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false,
  children,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props 
}) => {
  const getVariant = () => {
    if (variant === 'outline') return 'outline';
    if (variant === 'text') return 'link';
    return 'solid';
  };

  const getAction = () => {
    if (variant === 'secondary') return 'secondary';
    return 'primary';
  };

  return (
    <GluestackButton
      variant={getVariant()}
      action={getAction()}
      onPress={onPress}
      isDisabled={disabled || loading}
      style={[fullWidth && styles.fullWidth, style]}
      {...props}
    >
      <ButtonText style={textStyle}>
        {loading ? 'Loading...' : children}
      </ButtonText>
    </GluestackButton>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});
