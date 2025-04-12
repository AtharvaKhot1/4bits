import { useColorScheme } from 'react-native';

type ThemeColor = 'text' | 'background' | 'primary' | 'secondary' | 'accent';

const colors = {
  light: {
    text: '#222529',
    background: '#FFFFFF',
    primary: '#77FF33',
    secondary: '#222529',
    accent: '#77FF33',
  },
  dark: {
    text: '#FFFFFF',
    background: '#222529',
    primary: '#77FF33',
    secondary: '#FFFFFF',
    accent: '#77FF33',
  },
};

export function useThemeColor(colorName: ThemeColor): string {
  const theme = useColorScheme() ?? 'light';
  return colors[theme][colorName];
}