import React from 'react';
import { Snackbar as PaperSnackbar, SnackbarProps as PaperSnackbarProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { AppTheme } from '../../theme/colors';

interface SnackbarProps extends Omit<PaperSnackbarProps, 'children'> {
  message: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

export const Snackbar: React.FC<SnackbarProps> = ({ 
  message,
  type = 'default',
  style,
  ...props 
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return AppTheme.colors.success;
      case 'error':
        return AppTheme.colors.error;
      case 'warning':
        return AppTheme.colors.warning;
      case 'info':
        return AppTheme.colors.info;
      default:
        return AppTheme.colors.primary;
    }
  };

  return (
    <PaperSnackbar
      style={[
        styles.snackbar,
        { backgroundColor: getBackgroundColor() },
        style
      ]}
      {...props}
    >
      {message}
    </PaperSnackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    marginBottom: 20,
  },
});
