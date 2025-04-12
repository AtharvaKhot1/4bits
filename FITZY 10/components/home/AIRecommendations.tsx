import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ArrowRight, Brain, Dumbbell, Timer } from 'lucide-react-native';

interface WorkoutRecommendation {
  title: string;
  duration: string;
  intensity: string;
  imageUrl: string;
  calories: string;
}

export function AIRecommendations() {
  const textColor = useThemeColor('text');
  const cardBackground = useThemeColor('card');
  const accentColor = useThemeColor('accent');

  const recommendations: WorkoutRecommendation[] = [
    {
      title: 'High-Intensity Cardio',
      duration: '30 min',
      intensity: 'High',
      imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&auto=format&fit=crop',
      calories: '400',
    },
    {
      title: 'Strength Training',
      duration: '45 min',
      intensity: 'Medium',
      imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop',
      calories: '300',
    },
    {
      title: 'Yoga Flow',
      duration: '20 min',
      intensity: 'Low',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop',
      calories: '150',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: textColor }]}>AI Recommendations</Text>
          <Brain size={20} color={accentColor} style={styles.titleIcon} />
        </View>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={[styles.seeAllText, { color: accentColor }]}>See All</Text>
          <ArrowRight size={16} color={accentColor} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recommendations.map((workout, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: cardBackground }]}
          >
            <Image
              source={{ uri: workout.imageUrl }}
              style={styles.workoutImage}
            />
            <View style={styles.cardContent}>
              <Text style={[styles.workoutTitle, { color: textColor }]}>
                {workout.title}
              </Text>
              
              <View style={styles.statsContainer}>
                <View style={styles.stat}>
                  <Timer size={16} color={textColor} />
                  <Text style={[styles.statText, { color: textColor }]}>
                    {workout.duration}
                  </Text>
                </View>
                
                <View style={styles.stat}>
                  <Dumbbell size={16} color={textColor} />
                  <Text style={[styles.statText, { color: textColor }]}>
                    {workout.intensity}
                  </Text>
                </View>
                
                <View style={styles.stat}>
                  <Text style={[styles.statText, { color: textColor }]}>
                    {workout.calories} cal
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleIcon: {
    marginLeft: 8,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    marginRight: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingRight: 16,
  },
  card: {
    width: 280,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  workoutImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 4,
    fontSize: 14,
  },
});