import React from 'react';
import { Modal as RNModal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { AppTheme } from '../../theme/colors';

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ 
  visible, 
  onDismiss, 
  title,
  children 
}) => {
  return (
    <Portal>
      <RNModal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onDismiss}
      >
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onDismiss}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.modal}
            onPress={(e) => e.stopPropagation()}
          >
            {title && (
              <View style={styles.header}>
                <Text variant="titleLarge" style={styles.title}>{title}</Text>
              </View>
            )}
            <View style={styles.content}>
              {children}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </RNModal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(46, 52, 64, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: AppTheme.colors.surface,
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  title: {
    color: AppTheme.colors.text,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
});
