import { createConfig } from '@gluestack-ui/themed';
import { NordColors } from './nord';

export const gluestackConfig = createConfig({
  aliases: {},
  tokens: {
    colors: {
      primary0: NordColors.frost.nord10,
      primary50: NordColors.frost.nord9,
      primary100: NordColors.frost.nord8,
      primary200: NordColors.frost.nord8,
      primary300: NordColors.frost.nord9,
      primary400: NordColors.frost.nord9,
      primary500: NordColors.frost.nord9,
      primary600: NordColors.frost.nord10,
      primary700: NordColors.frost.nord10,
      primary800: NordColors.polarNight.nord3,
      primary900: NordColors.polarNight.nord2,
      primary950: NordColors.polarNight.nord1,
      
      error500: NordColors.aurora.nord11,
      success500: NordColors.aurora.nord14,
      warning500: NordColors.aurora.nord13,
      info500: NordColors.frost.nord8,
    },
    space: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48,
    },
    radii: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
  },
});
