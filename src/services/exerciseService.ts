import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { Exercise, WorkoutSession, WorkoutPlan, ExerciseCategory, BlogPost } from '../models/exercises';

// Exercise Operations
export const getExercises = async (category?: ExerciseCategory): Promise<Exercise[]> => {
  try {
    const exercisesRef = collection(db, 'exercises');
    let q = query(exercisesRef, orderBy('name'));

    if (category) {
      q = query(exercisesRef, where('category', '==', category), orderBy('name'));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Exercise));
  } catch (error) {
    console.error('Error getting exercises:', error);
    throw error;
  }
};

export const getExercisePaginated = async (
  lastDoc: QueryDocumentSnapshot<DocumentData> | null,
  perPage: number = 10,
  category?: ExerciseCategory
): Promise<{exercises: Exercise[], lastDoc: QueryDocumentSnapshot<DocumentData> | null}> => {
  try {
    const exercisesRef = collection(db, 'exercises');
    let q;

    if (category) {
      if (lastDoc) {
        q = query(
          exercisesRef,
          where('category', '==', category),
          orderBy('name'),
          startAfter(lastDoc),
          limit(perPage)
        );
      } else {
        q = query(
          exercisesRef,
          where('category', '==', category),
          orderBy('name'),
          limit(perPage)
        );
      }
    } else {
      if (lastDoc) {
        q = query(
          exercisesRef,
          orderBy('name'),
          startAfter(lastDoc),
          limit(perPage)
        );
      } else {
        q = query(
          exercisesRef,
          orderBy('name'),
          limit(perPage)
        );
      }
    }

    const snapshot = await getDocs(q);
    const exercises = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Exercise));

    return {
      exercises,
      lastDoc: snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null
    };
  } catch (error) {
    console.error('Error getting paginated exercises:', error);
    throw error;
  }
};

export const getExerciseById = async (id: string): Promise<Exercise | null> => {
  try {
    const exerciseRef = doc(db, 'exercises', id);
    const exerciseDoc = await getDoc(exerciseRef);

    if (exerciseDoc.exists()) {
      return { id: exerciseDoc.id, ...exerciseDoc.data() } as Exercise;
    }

    return null;
  } catch (error) {
    console.error('Error getting exercise by ID:', error);
    throw error;
  }
};

export const getRelatedExercises = async (exerciseId: string, category: ExerciseCategory, limit: number = 3): Promise<Exercise[]> => {
  try {
    const exercisesRef = collection(db, 'exercises');
    const q = query(
      exercisesRef,
      where('category', '==', category),
      where('id', '!=', exerciseId),
      orderBy('id'),
      limit
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Exercise));
  } catch (error) {
    console.error('Error getting related exercises:', error);
    throw error;
  }
};

// Workout Session Operations
export const getUserWorkoutSessions = async (userId: string): Promise<WorkoutSession[]> => {
  try {
    const workoutsRef = collection(db, 'workoutSessions');
    const q = query(
      workoutsRef,
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as WorkoutSession));
  } catch (error) {
    console.error('Error getting user workout sessions:', error);
    throw error;
  }
};

export const getWorkoutSessionById = async (id: string): Promise<WorkoutSession | null> => {
  try {
    const workoutRef = doc(db, 'workoutSessions', id);
    const workoutDoc = await getDoc(workoutRef);

    if (workoutDoc.exists()) {
      return { id: workoutDoc.id, ...workoutDoc.data() } as WorkoutSession;
    }

    return null;
  } catch (error) {
    console.error('Error getting workout session by ID:', error);
    throw error;
  }
};

export const saveWorkoutSession = async (workoutSession: Omit<WorkoutSession, 'id'>): Promise<string> => {
  try {
    const workoutsRef = collection(db, 'workoutSessions');
    const docRef = await addDoc(workoutsRef, {
      ...workoutSession,
      createdAt: serverTimestamp()
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving workout session:', error);
    throw error;
  }
};

export const updateWorkoutSession = async (id: string, data: Partial<WorkoutSession>): Promise<void> => {
  try {
    const workoutRef = doc(db, 'workoutSessions', id);
    await updateDoc(workoutRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating workout session:', error);
    throw error;
  }
};

export const deleteWorkoutSession = async (id: string): Promise<void> => {
  try {
    const workoutRef = doc(db, 'workoutSessions', id);
    await deleteDoc(workoutRef);
  } catch (error) {
    console.error('Error deleting workout session:', error);
    throw error;
  }
};

// Workout Plans Operations
export const getWorkoutPlans = async (category?: ExerciseCategory): Promise<WorkoutPlan[]> => {
  try {
    const plansRef = collection(db, 'workoutPlans');
    let q;

    if (category) {
      q = query(
        plansRef,
        where('category', '==', category),
        where('isPublic', '==', true),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        plansRef,
        where('isPublic', '==', true),
        orderBy('createdAt', 'desc')
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as WorkoutPlan));
  } catch (error) {
    console.error('Error getting workout plans:', error);
    throw error;
  }
};

export const getUserWorkoutPlans = async (userId: string): Promise<WorkoutPlan[]> => {
  try {
    const plansRef = collection(db, 'workoutPlans');
    const q = query(
      plansRef,
      where('createdBy', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as WorkoutPlan));
  } catch (error) {
    console.error('Error getting user workout plans:', error);
    throw error;
  }
};

export const getWorkoutPlanById = async (id: string): Promise<WorkoutPlan | null> => {
  try {
    const planRef = doc(db, 'workoutPlans', id);
    const planDoc = await getDoc(planRef);

    if (planDoc.exists()) {
      return { id: planDoc.id, ...planDoc.data() } as WorkoutPlan;
    }

    return null;
  } catch (error) {
    console.error('Error getting workout plan by ID:', error);
    throw error;
  }
};

export const saveWorkoutPlan = async (workoutPlan: Omit<WorkoutPlan, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const plansRef = collection(db, 'workoutPlans');
    const docRef = await addDoc(plansRef, {
      ...workoutPlan,
      createdAt: serverTimestamp()
    });

    return docRef.id;
  } catch (error) {
    console.error('Error saving workout plan:', error);
    throw error;
  }
};

export const updateWorkoutPlan = async (id: string, data: Partial<WorkoutPlan>): Promise<void> => {
  try {
    const planRef = doc(db, 'workoutPlans', id);
    await updateDoc(planRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating workout plan:', error);
    throw error;
  }
};

export const deleteWorkoutPlan = async (id: string): Promise<void> => {
  try {
    const planRef = doc(db, 'workoutPlans', id);
    await deleteDoc(planRef);
  } catch (error) {
    console.error('Error deleting workout plan:', error);
    throw error;
  }
};

// Blog Operations
export const getBlogPosts = async (category?: string, limit: number = 10): Promise<BlogPost[]> => {
  try {
    const blogsRef = collection(db, 'blogPosts');
    let q;

    if (category) {
      q = query(
        blogsRef,
        where('category', '==', category),
        orderBy('publishedAt', 'desc'),
        limit
      );
    } else {
      q = query(
        blogsRef,
        orderBy('publishedAt', 'desc'),
        limit
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BlogPost));
  } catch (error) {
    console.error('Error getting blog posts:', error);
    throw error;
  }
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const blogRef = doc(db, 'blogPosts', id);
    const blogDoc = await getDoc(blogRef);

    if (blogDoc.exists()) {
      return { id: blogDoc.id, ...blogDoc.data() } as BlogPost;
    }

    return null;
  } catch (error) {
    console.error('Error getting blog post by ID:', error);
    throw error;
  }
};
