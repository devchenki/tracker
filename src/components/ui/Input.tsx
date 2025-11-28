import React from 'react';
import { Input as GluestackInput, InputField, InputSlot } from '@gluestack-ui/themed';
import { StyleSheet, ViewStyle, TouchableOpacity, Text as RNText } from 'react-native';
import { NordTheme } from '../../theme/nord';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: boolean;
  disabled?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  style?: ViewStyle;
  right?: React.ReactNode;
}

const InputComponent: React.FC<InputProps> = ({ 
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  secureTextEntry = false,
  error = false,
  disabled = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  style,
  right,
  ...props 
}) => {
  return (
    <GluestackInput
      isDisabled={disabled}
      isInvalid={error}
      style={[styles.input, style]}
    >
      <InputField
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder || label}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        {...props}
      />
      {right && <InputSlot pr="$3">{right}</InputSlot>}
    </GluestackInput>
  );
};

const InputIconComponent = ({ icon, onPress }: { icon: string; onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.iconButton}>
    <RNText style={styles.iconText}>
      {icon === 'eye' ? '👁' : icon === 'eye-off' ? '👁️' : '•'}
    </RNText>
  </TouchableOpacity>
);

export const Input = Object.assign(InputComponent, {
  Icon: InputIconComponent,
  Affix: InputSlot,
});

const styles = StyleSheet.create({
  input: {
    backgroundColor: NordTheme.colors.surface,
    borderColor: NordTheme.colors.border,
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    color: NordTheme.colors.textSecondary,
  },
});
