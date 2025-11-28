import React from 'react';
import { Button as GluestackButton, ButtonText } from '@gluestack-ui/themed';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

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
  fullWidth = false,
  children,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props 
}) => {
  return (
    <GluestackButton
      onPress={onPress}
      isDisabled={disabled || loading}
      style={[fullWidth && styles.fullWidth, style] as any}
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
