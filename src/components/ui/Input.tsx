import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme/colors';

interface InputProps extends Omit<TextInputProps, 'theme'> {
  error?: boolean;
  errorMessage?: string;
}

const InputComponent: React.FC<InputProps> = ({ 
  error, 
  errorMessage,
  style,
  ...props 
}) => {
  return (
    <TextInput
      mode="outlined"
      outlineColor={error ? AppTheme.colors.error : AppTheme.colors.border}
      activeOutlineColor={error ? AppTheme.colors.error : AppTheme.colors.primary}
      textColor={AppTheme.colors.text}
      error={error}
      style={[styles.input, style]}
      {...props}
    />
  );
};

export const Input = Object.assign(InputComponent, {
  Icon: TextInput.Icon,
  Affix: TextInput.Affix,
});

const styles = StyleSheet.create({
  input: {
    backgroundColor: AppTheme.colors.surface,
  },
});
