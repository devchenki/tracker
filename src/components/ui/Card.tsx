import React from 'react';
import { Box, Heading, Text, VStack, HStack } from '@gluestack-ui/themed';
import { StyleSheet, ViewStyle, View } from 'react-native';
import { NordTheme } from '../../theme/nord';

interface CardProps {
  children: React.ReactNode;
  elevation?: number;
  style?: ViewStyle;
}

const CardComponent: React.FC<CardProps> = ({ 
  elevation = 2,
  children,
  style,
  ...props 
}) => {
  return (
    <Box
      style={[
        styles.card,
        elevation && { elevation },
        style
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};

const CardTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <View style={styles.titleContainer}>
    <Heading style={styles.title}>{title}</Heading>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
  </View>
);

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box style={styles.content}>{children}</Box>
);

const CardActions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.actions}>{children}</View>
);

export const Card = Object.assign(CardComponent, {
  Title: CardTitle,
  Content: CardContent,
  Actions: CardActions,
});

export { CardTitle, CardContent, CardActions };

const styles = StyleSheet.create({
  card: {
    backgroundColor: NordTheme.colors.surface,
    borderRadius: NordTheme.borderRadius.md,
    borderWidth: 1,
    borderColor: NordTheme.colors.border,
    overflow: 'hidden',
  },
  titleContainer: {
    padding: NordTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: NordTheme.colors.border,
  },
  title: {
    color: NordTheme.colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: NordTheme.colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    padding: NordTheme.spacing.md,
  },
  actions: {
    padding: NordTheme.spacing.sm,
    paddingTop: 0,
    flexDirection: 'row',
    gap: 8,
  },
});
