import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ArrowLeft, Clock } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BlogPostScreen() {
  const { id } = useLocalSearchParams();
  const backgroundColor = useThemeColor('background');
  const textColor = useThemeColor('text');
  const accentColor = useThemeColor('accent');

  // In a real app, this would fetch from an API
  const post = {
    id: '1',
    title: 'The Science Behind High-Intensity Interval Training',
    content: `High-Intensity Interval Training (HIIT) has become increasingly popular in recent years, and for good reason. This training method alternates between intense bursts of activity and fixed periods of less-intense activity or complete rest.

The Science Behind HIIT:

1. Increased Metabolic Rate
HIIT has been shown to increase your metabolic rate for hours after exercise. This means you continue to burn calories long after your workout is complete, a phenomenon known as the "afterburn effect" or excess post-exercise oxygen consumption (EPOC).

2. Improved Insulin Sensitivity
Regular HIIT workouts can improve insulin sensitivity, helping your muscles better use glucose for energy. This can be particularly beneficial for those at risk of type 2 diabetes.

3. Enhanced Cardiovascular Health
Despite being shorter in duration, HIIT can provide similar or even superior cardiovascular benefits compared to traditional steady-state cardio.

How to Get Started:

• Start with a 1:2 work-to-rest ratio
• Begin with 20-30 second intervals
• Choose exercises you're comfortable with
• Listen to your body and progress gradually

Remember to always warm up properly and stay hydrated during your HIIT sessions. As with any exercise program, consistency is key to seeing results.`,
    category: 'Workout',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop',
    readTime: '4 min read',
    author: 'Fitness Expert',
    date: 'March 15, 2024'
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={textColor} />
        </TouchableOpacity>

        <Image source={{ uri: post.imageUrl }} style={styles.heroImage} />
        
        <View style={styles.content}>
          <Text style={[styles.category, { color: accentColor }]}>
            {post.category}
          </Text>
          
          <Text style={[styles.title, { color: textColor }]}>
            {post.title}
          </Text>
          
          <View style={styles.meta}>
            <View style={styles.authorDate}>
              <Text style={[styles.author, { color: textColor }]}>
                {post.author}
              </Text>
              <Text style={[styles.date, { color: textColor + '80' }]}>
                {post.date}
              </Text>
            </View>
            
            <View style={styles.readTime}>
              <Clock size={16} color={textColor + '80'} />
              <Text style={[styles.readTimeText, { color: textColor + '80' }]}>
                {post.readTime}
              </Text>
            </View>
          </View>

          <Text style={[styles.bodyText, { color: textColor }]}>
            {post.content}
          </Text>
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
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 16,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  authorDate: {
    flex: 1,
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTimeText: {
    marginLeft: 4,
    fontSize: 14,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
  },
});