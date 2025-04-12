import { Tabs } from 'expo-router';
import { SquareActivity as ActivitySquare, ChartBar as BarChart2, BookOpen, Chrome as Home, Settings } from 'lucide-react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const iconColor = useThemeColor('text');
  const activeIconColor = '#77FF33';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#222529',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: activeIconColor,
        tabBarInactiveTintColor: iconColor,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: 'Track',
          tabBarIcon: ({ color, size }) => <ActivitySquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="blog"
        options={{
          title: 'Blog',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}