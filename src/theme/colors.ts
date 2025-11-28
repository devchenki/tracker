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

export const AppTheme = {
  colors: {
    primary: NordColors.frost.nord9,
    primaryDark: NordColors.frost.nord10,
    secondary: NordColors.aurora.nord14,
    background: NordColors.snowStorm.nord6,
    surface: NordColors.snowStorm.nord5,
    text: NordColors.polarNight.nord0,
    textSecondary: NordColors.polarNight.nord3,
    border: NordColors.snowStorm.nord4,
    error: NordColors.aurora.nord11,
    success: NordColors.aurora.nord14,
    warning: NordColors.aurora.nord13,
    info: NordColors.frost.nord8,
    disabled: NordColors.polarNight.nord3,
    placeholder: NordColors.polarNight.nord3,
  },
};
