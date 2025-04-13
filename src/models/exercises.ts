// Exercise Models and Types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  image: string;
  videoUrl?: string;
  instructions: string[];
  tips: string[];
  equipment: string[];
  targetMuscles: string[];
  duration: number; // in minutes
  caloriesBurn: number; // estimated calories burned
  requiresSpace: boolean;
}

export type ExerciseCategory = 'office' | 'home' | 'hybrid' | 'hiit';

export interface CategoryInfo {
  id: ExerciseCategory;
  name: string;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'office',
    name: 'Office Workouts',
    description: 'Boost your energy and productivity with simple exercises that can be done in business attire without breaking a sweat.',
    image: '/class-images/office.jpg'
  },
  {
    id: 'home',
    name: 'Home Workouts',
    description: 'Transform daily household activities into effective workouts that fit seamlessly between chores while toning muscles and burning calories without special equipment.',
    image: '/class-images/home.jpg'
  },
  {
    id: 'hybrid',
    name: 'Hybrid Workouts',
    description: 'Combine elements of cardio and strength training for a balanced fitness routine that works for both home and office settings.',
    image: '/class-images/hybrid.jpg'
  },
  {
    id: 'hiit',
    name: 'HIIT Workouts',
    description: 'High-intensity interval training with short, intense activity bursts and brief rest periods for maximum calorie burn.',
    image: '/class-images/hiit.jpg'
  },
];

export interface WorkoutSession {
  id: string;
  userId: string;
  date: string;
  exercises: {
    exerciseId: string;
    sets: number;
    reps: number;
    duration: number; // in minutes
  }[];
  totalDuration: number; // in minutes
  caloriesBurned: number;
  notes: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  exercises: {
    exerciseId: string;
    sets: number;
    reps: number;
    restTime: number; // in seconds
  }[];
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  category: 'fitness' | 'nutrition' | 'wellness' | 'motivation';
  tags: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number; // in minutes
}
