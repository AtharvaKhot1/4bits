import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { CircularProgress } from '@/components/shared/CircularProgress';

export function DailyProgress() {
  const textColor = useThemeColor('text');
  const accentColor = useThemeColor('accent');

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>Today's Progress</Text>
      <View style={styles.progressContainer}>
        <CircularProgress
          progress={0.7}
          size={100}
          strokeWidth={10}
          color={accentColor}
          label="Water"
          value="1.4L"
          target="2L"
        />
        <CircularProgress
          progress={0.5}
          size={100}
          strokeWidth={10}
          color={accentColor}
          label="Calories"
          value="1200"
          target="2400"
        />
        <CircularProgress
          progress={0.3}
          size={100}
          strokeWidth={10}
          color={accentColor}
          label="Exercise"
          value="30min"
          target="60min"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});