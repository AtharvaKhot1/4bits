import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Activity, Book, Dumbbell, MessageCircle } from 'lucide-react-native';

export function QuickActions() {
  const textColor = useThemeColor('text');
  const cardBackground = useThemeColor('card');

  const actions = [
    { icon: Activity, label: 'Track Workout', onPress: () => {} },
    { icon: Book, label: 'Log Nutrition', onPress: () => {} },
    { icon: Dumbbell, label: 'Start Session', onPress: () => {} },
    { icon: MessageCircle, label: 'Chat with AI', onPress: () => {} },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>Quick Actions</Text>
      <View style={styles.grid}>
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionCard, { backgroundColor: cardBackground }]}
            onPress={action.onPress}
          >
            <action.icon size={24} color={textColor} />
            <Text style={[styles.actionLabel, { color: textColor }]}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  actionLabel: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});