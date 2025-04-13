import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../firebase';
import { User } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

interface UserProgress {
  completedExercises: string[];
  savedWorkouts: string[];
  streakDays: number;
  lastWorkoutDate: string | null;
  stats: {
    caloriesBurned: number;
    minutesExercised: number;
    workoutsCompleted: number;
  };
}

interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  createdAt: string;
  progress: UserProgress;
  settings: {
    notificationsEnabled: boolean;
    reminderTime: string | null;
  };
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  trackExerciseCompletion: (exerciseId: string) => Promise<void>;
  saveWorkout: (workoutId: string) => Promise<void>;
  updateProgressStats: (stats: Partial<UserProgress['stats']>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        // Fetch user profile data
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            // Create new user profile if it doesn't exist
            const newUserProfile: UserProfile = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              createdAt: new Date().toISOString(),
              progress: {
                completedExercises: [],
                savedWorkouts: [],
                streakDays: 0,
                lastWorkoutDate: null,
                stats: {
                  caloriesBurned: 0,
                  minutesExercised: 0,
                  workoutsCompleted: 0,
                }
              },
              settings: {
                notificationsEnabled: false,
                reminderTime: null,
              }
            };

            await setDoc(userDocRef, newUserProfile);
            setUserProfile(newUserProfile);
          }
        } catch (error) {
          console.error("Error getting user profile:", error);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signup(email: string, password: string, displayName: string) {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);

    // Update the user's display name
    await userCredential.user.updateProfile({
      displayName
    });

    // Create user profile document
    const newUserProfile: UserProfile = {
      uid: userCredential.user.uid,
      displayName: displayName,
      email: userCredential.user.email,
      photoURL: userCredential.user.photoURL,
      createdAt: new Date().toISOString(),
      progress: {
        completedExercises: [],
        savedWorkouts: [],
        streakDays: 0,
        lastWorkoutDate: null,
        stats: {
          caloriesBurned: 0,
          minutesExercised: 0,
          workoutsCompleted: 0,
        }
      },
      settings: {
        notificationsEnabled: false,
        reminderTime: null,
      }
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), newUserProfile);
  }

  async function login(email: string, password: string) {
    await auth.signInWithEmailAndPassword(email, password);
  }

  async function logout() {
    await auth.signOut();
  }

  async function updateUserProfile(data: Partial<UserProfile>) {
    if (!currentUser) throw new Error('No authenticated user!');

    const userDocRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userDocRef, { ...data });

    // Update local state
    if (userProfile) {
      setUserProfile({ ...userProfile, ...data });
    }
  }

  async function trackExerciseCompletion(exerciseId: string) {
    if (!currentUser || !userProfile) throw new Error('No authenticated user!');

    const userDocRef = doc(db, 'users', currentUser.uid);

    // Add to completed exercises if not already completed
    if (!userProfile.progress.completedExercises.includes(exerciseId)) {
      await updateDoc(userDocRef, {
        'progress.completedExercises': arrayUnion(exerciseId)
      });

      // Update streak
      const today = new Date().toISOString().split('T')[0];
      if (userProfile.progress.lastWorkoutDate !== today) {
        const lastWorkoutDate = userProfile.progress.lastWorkoutDate;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        let newStreakDays = userProfile.progress.streakDays;

        // If last workout was yesterday, increment streak, otherwise reset to 1
        if (lastWorkoutDate === yesterdayString) {
          newStreakDays += 1;
        } else if (lastWorkoutDate !== today) {
          newStreakDays = 1;
        }

        await updateDoc(userDocRef, {
          'progress.streakDays': newStreakDays,
          'progress.lastWorkoutDate': today
        });

        // Update local state
        setUserProfile({
          ...userProfile,
          progress: {
            ...userProfile.progress,
            completedExercises: [...userProfile.progress.completedExercises, exerciseId],
            streakDays: newStreakDays,
            lastWorkoutDate: today
          }
        });
      } else {
        // Just update local state for completed exercise
        setUserProfile({
          ...userProfile,
          progress: {
            ...userProfile.progress,
            completedExercises: [...userProfile.progress.completedExercises, exerciseId]
          }
        });
      }
    }
  }

  async function saveWorkout(workoutId: string) {
    if (!currentUser || !userProfile) throw new Error('No authenticated user!');

    const userDocRef = doc(db, 'users', currentUser.uid);

    // Add to saved workouts if not already saved
    if (!userProfile.progress.savedWorkouts.includes(workoutId)) {
      await updateDoc(userDocRef, {
        'progress.savedWorkouts': arrayUnion(workoutId)
      });

      // Update local state
      setUserProfile({
        ...userProfile,
        progress: {
          ...userProfile.progress,
          savedWorkouts: [...userProfile.progress.savedWorkouts, workoutId]
        }
      });
    }
  }

  async function updateProgressStats(stats: Partial<UserProgress['stats']>) {
    if (!currentUser || !userProfile) throw new Error('No authenticated user!');

    const userDocRef = doc(db, 'users', currentUser.uid);
    const newStats = {
      caloriesBurned: (userProfile.progress.stats.caloriesBurned || 0) + (stats.caloriesBurned || 0),
      minutesExercised: (userProfile.progress.stats.minutesExercised || 0) + (stats.minutesExercised || 0),
      workoutsCompleted: (userProfile.progress.stats.workoutsCompleted || 0) + (stats.workoutsCompleted || 0),
    };

    await updateDoc(userDocRef, {
      'progress.stats': newStats
    });

    // Update local state
    setUserProfile({
      ...userProfile,
      progress: {
        ...userProfile.progress,
        stats: newStats
      }
    });
  }

  const value = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    updateUserProfile,
    trackExerciseCompletion,
    saveWorkout,
    updateProgressStats
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
