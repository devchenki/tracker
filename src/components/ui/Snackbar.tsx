import React from 'react';
import { Toast, ToastTitle, useToast, ToastDescription } from '@gluestack-ui/themed';

interface SnackbarProps {
  visible: boolean;
  onDismiss: () => void;
  message: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const Snackbar: React.FC<SnackbarProps> = ({ 
  visible,
  onDismiss,
  message,
  type = 'default',
  duration = 3000,
  action,
  ...props 
}) => {
  const toast = useToast();
  const toastIdRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    if (visible && !toastIdRef.current) {
      const id = toast.show({
        placement: 'bottom',
        duration,
        render: ({ id }) => {
          return (
            <Toast nativeID={`toast-${id}`}>
              <ToastDescription>{message}</ToastDescription>
            </Toast>
          );
        },
      });
      
      toastIdRef.current = id;

      const timer = setTimeout(() => {
        onDismiss();
        if (toastIdRef.current) {
          toast.close(toastIdRef.current);
          toastIdRef.current = null;
        }
      }, duration);

      return () => {
        clearTimeout(timer);
        if (toastIdRef.current) {
          toast.close(toastIdRef.current);
          toastIdRef.current = null;
        }
      };
    }
  }, [visible, message, type, duration]);

  return null;
};
