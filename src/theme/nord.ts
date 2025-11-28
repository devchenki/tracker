export const NordColors = {
  polarNight: {
    nord0: '#2E3440',
    nord1: '#3B4252',
    nord2: '#434C5E',
    nord3: '#4C566A',
  },
  snowStorm: {
    nord4: '#D8DEE9',
    nord5: '#E5E9F0',
    nord6: '#ECEFF4',
  },
  frost: {
    nord7: '#8FBCBB',
    nord8: '#88C0D0',
    nord9: '#81A1C1',
    nord10: '#5E81AC',
  },
  aurora: {
    nord11: '#BF616A',
    nord12: '#D08770',
    nord13: '#EBCB8B',
    nord14: '#A3BE8C',
    nord15: '#B48EAD',
  },
};

export const NordTheme = {
  colors: {
    primary: NordColors.frost.nord9,
    primaryDark: NordColors.frost.nord10,
    primaryLight: NordColors.frost.nord8,
    secondary: NordColors.aurora.nord14,
    accent: NordColors.frost.nord7,
    background: NordColors.snowStorm.nord6,
    surface: NordColors.snowStorm.nord5,
    card: NordColors.snowStorm.nord4,
    text: NordColors.polarNight.nord0,
    textSecondary: NordColors.polarNight.nord3,
    textLight: NordColors.polarNight.nord2,
    border: NordColors.snowStorm.nord4,
    error: NordColors.aurora.nord11,
    success: NordColors.aurora.nord14,
    warning: NordColors.aurora.nord13,
    info: NordColors.frost.nord8,
    disabled: NordColors.polarNight.nord3,
    placeholder: NordColors.polarNight.nord3,
    white: '#FFFFFF',
    black: NordColors.polarNight.nord0,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export type NordThemeType = typeof NordTheme;
