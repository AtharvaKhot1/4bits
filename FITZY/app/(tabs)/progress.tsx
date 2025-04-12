import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { TrendingUp, Scale, Timer, Dumbbell } from 'lucide-react-native';

export default function ProgressScreen() {
  const backgroundColor = useThemeColor('background');
  const textColor = useThemeColor('text');
  const accentColor = useThemeColor('accent');

  const screenWidth = Dimensions.get('window').width;

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 68, 66, 67, 69, 70, 68],
        color: () => accentColor,
      },
    ],
  };

  const workoutData = {
    labels: ['Cardio', 'Strength', 'Yoga', 'HIIT'],
    datasets: [
      {
        data: [45, 80, 30, 60],
      },
    ],
  };

  const stats = [
    { icon: Scale, label: 'Current Weight', value: '68 kg', trend: '+2kg this month' },
    { icon: Timer, label: 'Workout Time', value: '5.5 hrs', trend: '+1.2 hrs vs last week' },
    { icon: Dumbbell, label: 'Max Weight', value: '80 kg', trend: '+5kg this month' },
    { icon: TrendingUp, label: 'Active Days', value: '5/7', trend: '2 days streak' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: textColor }]}>Your Progress</Text>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: '#2A2D31' }]}>
              <stat.icon size={24} color={accentColor} />
              <Text style={[styles.statLabel, { color: textColor }]}>{stat.label}</Text>
              <Text style={[styles.statValue, { color: textColor }]}>{stat.value}</Text>
              <Text style={[styles.statTrend, { color: accentColor }]}>{stat.trend}</Text>
            </View>
          ))}
        </View>

        <View style={styles.chartContainer}>
          <Text style={[styles.chartTitle, { color: textColor }]}>Weight Tracking</Text>
          <LineChart
            data={weeklyData}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: backgroundColor,
              backgroundGradientFrom: backgroundColor,
              backgroundGradientTo: backgroundColor,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(119, 255, 51, ${opacity})`,
              labelColor: () => textColor,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={[styles.chartTitle, { color: textColor }]}>Workout Distribution</Text>
          <BarChart
            data={workoutData}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: backgroundColor,
              backgroundGradientFrom: backgroundColor,
              backgroundGradientTo: backgroundColor,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(119, 255, 51, ${opacity})`,
              labelColor: () => textColor,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 12,
    opacity: 0.8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statTrend: {
    fontSize: 12,
    marginTop: 4,
  },
  chartContainer: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
});