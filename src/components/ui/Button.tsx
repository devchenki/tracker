import React from 'react';
import { Button as PaperButton, ButtonProps as PaperButtonProps } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';
import { AppTheme } from '../../theme/colors';

interface ButtonProps extends Omit<PaperButtonProps, 'mode'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false,
  style,
  buttonColor,
  textColor,
  ...props 
}) => {
  const getButtonColor = () => {
    if (buttonColor) return buttonColor;
    
    switch (variant) {
      case 'primary':
        return AppTheme.colors.primary;
      case 'secondary':
        return AppTheme.colors.secondary;
      case 'outline':
      case 'text':
        return 'transparent';
      default:
        return AppTheme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    
    switch (variant) {
      case 'primary':
      case 'secondary':
        return '#FFFFFF';
      case 'outline':
      case 'text':
        return AppTheme.colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const mode = variant === 'outline' ? 'outlined' : variant === 'text' ? 'text' : 'contained';

  return (
    <PaperButton
      mode={mode}
      buttonColor={getButtonColor()}
      textColor={getTextColor()}
      style={[fullWidth && styles.fullWidth, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});
