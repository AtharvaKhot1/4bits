import { collection, addDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { allExercises, officeExercises, homeExercises } from '../data/seedExercises';
import { Exercise } from '../models/exercises';

// Load all exercises into Firestore
export const seedExercises = async (): Promise<void> => {
  try {
    const exercisesRef = collection(db, 'exercises');

    // First, check if exercises already exist to avoid duplicates
    const q = query(exercisesRef, where('id', 'in', allExercises.map(ex => ex.id).slice(0, 10)));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log('Exercises already seeded. Skipping seeding process.');
      return;
    }

    // Add each exercise
    const promises = allExercises.map(exercise => addDoc(exercisesRef, exercise));
    await Promise.all(promises);

    console.log(`Successfully seeded ${allExercises.length} exercises!`);
  } catch (error) {
    console.error('Error seeding exercises:', error);
    throw error;
  }
};

// Load only office exercises
export const seedOfficeExercises = async (): Promise<void> => {
  try {
    const exercisesRef = collection(db, 'exercises');

    // Check if office exercises already exist
    const q = query(exercisesRef, where('category', '==', 'office'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log('Office exercises already seeded. Skipping seeding process.');
      return;
    }

    // Add each office exercise
    const promises = officeExercises.map(exercise => addDoc(exercisesRef, exercise));
    await Promise.all(promises);

    console.log(`Successfully seeded ${officeExercises.length} office exercises!`);
  } catch (error) {
    console.error('Error seeding office exercises:', error);
    throw error;
  }
};

// Load only home exercises
export const seedHomeExercises = async (): Promise<void> => {
  try {
    const exercisesRef = collection(db, 'exercises');

    // Check if home exercises already exist
    const q = query(exercisesRef, where('category', '==', 'home'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log('Home exercises already seeded. Skipping seeding process.');
      return;
    }

    // Add each home exercise
    const promises = homeExercises.map(exercise => addDoc(exercisesRef, exercise));
    await Promise.all(promises);

    console.log(`Successfully seeded ${homeExercises.length} home exercises!`);
  } catch (error) {
    console.error('Error seeding home exercises:', error);
    throw error;
  }
};

// Reset/clean exercise data (use with caution)
export const clearExercises = async (): Promise<void> => {
  try {
    const exercisesRef = collection(db, 'exercises');
    const snapshot = await getDocs(exercisesRef);

    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log(`Successfully cleared ${snapshot.docs.length} exercises!`);
  } catch (error) {
    console.error('Error clearing exercises:', error);
    throw error;
  }
};

// Utility function to seed local data when Firestore is not available
export const getLocalExercises = (category?: string): Exercise[] => {
  if (!category) {
    return allExercises;
  }

  if (category === 'office') {
    return officeExercises;
  }

  if (category === 'home') {
    return homeExercises;
  }

  return allExercises.filter(ex => ex.category === category);
};
