import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Bell, Maximize2, Calendar, Clock, Dumbbell, Flame } from 'lucide-react-native';

export default function HomeScreen() {
  const backgroundColor = useThemeColor('background');
  const textColor = useThemeColor('text');
  const accentColor = useThemeColor('accent');

  const days = [
    { day: 'Mon', date: '7' },
    { day: 'Tue', date: '8' },
    { day: 'Wed', date: '9' },
    { day: 'Thu', date: '10' },
    { day: 'Fri', date: '11' },
    { day: 'Today', date: '12', isActive: true },
    { day: 'Sun', date: '13' },
  ];

  const workouts = [
    {
      title: 'Defined Arms',
      level: 'Intermediate',
      duration: '36min',
      type: 'Strength',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop',
      tag: 'Popular'
    },
    {
      title: 'Upper Body Shredder',
      level: 'Intermediate',
      duration: '36min',
      type: 'Strength',
      image: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&auto=format&fit=crop',
      tag: 'New'
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.logo, { color: textColor }]}>Gym Monster</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color={textColor} />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Maximize2 size={24} color={textColor} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.featuredCard, { backgroundColor: '#2A2D31' }]}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&auto=format&fit=crop' }}
            style={styles.featuredImage}
          />
          <View style={styles.featuredContent}>
            <Text style={[styles.featuredTag, { color: accentColor }]}>SPEEDIANCE</Text>
            <Text style={[styles.featuredTitle, { color: textColor }]}>
              HOME IS WHERE{'\n'}SPEEDIANCE IS
            </Text>
            <Text style={[styles.featuredSubtitle, { color: textColor }]}>
              Show us your Speediance setup and WIN BIG.
            </Text>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statsSectionHeader}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Last 7 Days Workout Stats</Text>
            <TouchableOpacity>
              <Text style={[styles.moreLink, { color: accentColor }]}>More</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: textColor }]}>0</Text>
              <Text style={[styles.statLabel, { color: textColor }]}>Duration(min)</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: textColor }]}>0</Text>
              <Text style={[styles.statLabel, { color: textColor }]}>Volume(kg)</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: textColor }]}>0</Text>
              <Text style={[styles.statLabel, { color: textColor }]}>Calories(kcal)</Text>
            </View>
          </View>
          
          <Text style={[styles.startWorkout, { color: textColor }]}>Start your first workout!</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.calendar}
          contentContainerStyle={styles.calendarContent}
        >
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayItem,
                day.isActive && { backgroundColor: accentColor }
              ]}
            >
              <Text style={[
                styles.dayText,
                { color: day.isActive ? '#000' : textColor }
              ]}>
                {day.day}
              </Text>
              <Text style={[
                styles.dateText,
                { color: day.isActive ? '#000' : textColor }
              ]}>
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: textColor, marginTop: 24 }]}>Daily Workout</Text>
        
        <View style={styles.workoutGrid}>
          {workouts.map((workout, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.workoutCard, { backgroundColor: '#2A2D31' }]}
            >
              <Image source={{ uri: workout.image }} style={styles.workoutImage} />
              <View style={styles.workoutTag}>
                <Text style={styles.workoutTagText}>{workout.tag}</Text>
              </View>
              <View style={styles.workoutContent}>
                <Text style={[styles.workoutTitle, { color: textColor }]}>{workout.title}</Text>
                <View style={styles.workoutMeta}>
                  <Text style={[styles.workoutMetaText, { color: textColor }]}>
                    {workout.level} • {workout.duration} • {workout.type}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsFooter}>
          <View style={[styles.footerCard, { backgroundColor: '#2A2D31' }]}>
            <View style={styles.footerCardContent}>
              <Calendar size={24} color={textColor} />
              <Text style={[styles.footerCardTitle, { color: textColor }]}>Custom</Text>
              <Text style={[styles.footerCardValue, { color: textColor }]}>0 Custom total</Text>
            </View>
          </View>
          <View style={[styles.footerCard, { backgroundColor: '#2A2D31' }]}>
            <View style={styles.footerCardContent}>
              <Dumbbell size={24} color={textColor} />
              <Text style={[styles.footerCardTitle, { color: textColor }]}>Movement</Text>
              <Text style={[styles.footerCardValue, { color: textColor }]}>441 Moves total</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  featuredCard: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTag: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 32,
  },
  featuredSubtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  statsSection: {
    padding: 16,
  },
  statsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  moreLink: {
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.8,
  },
  startWorkout: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  calendar: {
    paddingHorizontal: 16,
  },
  calendarContent: {
    gap: 8,
  },
  dayItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#2A2D31',
    alignItems: 'center',
    marginRight: 8,
  },
  dayText: {
    fontSize: 14,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutGrid: {
    padding: 16,
    gap: 16,
  },
  workoutCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  workoutImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  workoutTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#77FF33',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  workoutTagText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  workoutContent: {
    padding: 16,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutMetaText: {
    fontSize: 14,
    opacity: 0.8,
  },
  statsFooter: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  footerCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  footerCardContent: {
    alignItems: 'center',
    gap: 8,
  },
  footerCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerCardValue: {
    fontSize: 14,
    opacity: 0.8,
  },
});