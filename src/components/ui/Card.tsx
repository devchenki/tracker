import React from 'react';
import { Card as PaperCard, CardProps as PaperCardProps } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';
import { AppTheme } from '../../theme/colors';

interface CardProps extends PaperCardProps {
  elevation?: number;
}

const CardComponent: React.FC<CardProps> = ({ 
  elevation = 2,
  style,
  ...props 
}) => {
  return (
    <PaperCard
      mode="elevated"
      elevation={elevation}
      style={[styles.card, style]}
      {...props}
    />
  );
};

export const Card = Object.assign(CardComponent, {
  Title: PaperCard.Title,
  Content: PaperCard.Content,
  Actions: PaperCard.Actions,
  Cover: PaperCard.Cover,
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppTheme.colors.surface,
  },
});

export const CardTitle = PaperCard.Title;
export const CardContent = PaperCard.Content;
export const CardActions = PaperCard.Actions;
export const CardCover = PaperCard.Cover;
