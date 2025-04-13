import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { FiClock, FiTarget, FiAward, FiHeart, FiHome, FiBookmark, FiCheck } from 'react-icons/fi';
import { getExerciseById, getRelatedExercises } from '../services/exerciseService';
import { getLocalExercises } from '../services/seedService';
import { Exercise, ExerciseCategory } from '../models/exercises';

export default function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const { category } = useParams<{ category: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [relatedExercises, setRelatedExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [useLocalData, setUseLocalData] = useState(false);
  const { currentUser, userProfile, trackExerciseCompletion, saveWorkout, updateProgressStats } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercise = async () => {
      if (!id) return;

      try {
        setLoading(true);

        let exerciseData: Exercise | null = null;
        let relatedData: Exercise[] = [];

        try {
          // First try to get data from Firestore
          exerciseData = await getExerciseById(id);

          if (exerciseData) {
            // Try to get related exercises
            relatedData = await getRelatedExercises(
              id,
              exerciseData.category as ExerciseCategory,
              3
            );
          } else {
            // If not found in Firestore, try local data
            setUseLocalData(true);
            const localExercises = getLocalExercises();
            exerciseData = localExercises.find(ex => ex.id === id) || null;

            if (exerciseData) {
              // Get related exercises from local data
              relatedData = localExercises
                .filter(ex =>
                  ex.category === exerciseData?.category &&
                  ex.id !== exerciseData?.id
                )
                .slice(0, 3);
            }
          }
        } catch (err) {
          // On Firestore error, use local data
          console.warn('Error fetching from Firestore, using local data instead:', err);
          setUseLocalData(true);
          const localExercises = getLocalExercises();
          exerciseData = localExercises.find(ex => ex.id === id) || null;

          if (exerciseData) {
            // Get related exercises from local data
            relatedData = localExercises
              .filter(ex =>
                ex.category === exerciseData?.category &&
                ex.id !== exerciseData?.id
              )
              .slice(0, 3);
          }
        }

        if (exerciseData) {
          setExercise(exerciseData);
          setRelatedExercises(relatedData);

          // Check if user has completed this exercise
          if (userProfile && userProfile.progress.completedExercises.includes(id)) {
            setCompleted(true);
          }

          // Check if user has saved this exercise
          if (userProfile && userProfile.progress.savedWorkouts.includes(id)) {
            setSaved(true);
          }
        } else {
          setError('Exercise not found');
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch exercise details');
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id, userProfile]);

  const handleMarkComplete = async () => {
    if (!currentUser || !exercise) return;

    try {
      await trackExerciseCompletion(exercise.id);
      setCompleted(true);

      // Update user stats
      await updateProgressStats({
        caloriesBurned: exercise.caloriesBurn || 0,
        minutesExercised: exercise.duration || 0,
        workoutsCompleted: 1
      });

      // Show success message or notification here
    } catch (err) {
      console.error(err);
      // Show error message here
    }
  };

  const handleSaveWorkout = async () => {
    if (!currentUser || !exercise) return;

    try {
      await saveWorkout(exercise.id);
      setSaved(true);
      // Show success message or notification here
    } catch (err) {
      console.error(err);
      // Show error message here
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-white">
          <div className="animate-pulse">
            <div className="h-8 bg-FITZY-dark/70 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-96 bg-FITZY-dark/70 rounded mb-8"></div>
            <div className="h-4 bg-FITZY-dark/70 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-FITZY-dark/70 rounded w-1/2 mx-auto mb-8"></div>
          </div>
          <p>Loading exercise details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-FITZY-teal hover:bg-FITZY-teal/80 text-white py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {useLocalData && (
        <div className="mb-4 text-center text-yellow-400 text-sm">
          Note: Using local exercise data. Connect to Firebase to access the full exercise database and to save your progress.
        </div>
      )}

      <div className="bg-FITZY-dark/50 rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div>
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-full h-96 object-cover rounded-lg"
            />

            {/* Buttons for authenticated users */}
            {currentUser && (
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleMarkComplete}
                  disabled={completed || useLocalData}
                  className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
                    completed
                      ? 'bg-green-500/20 text-green-300'
                      : useLocalData
                      ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                      : 'bg-FITZY-teal hover:bg-FITZY-teal/80 text-white'
                  }`}
                >
                  {completed ? <FiCheck /> : <FiTarget />}
                  {completed ? 'Completed' : 'Mark as Done'}
                </button>

                <button
                  onClick={handleSaveWorkout}
                  disabled={saved || useLocalData}
                  className={`flex items-center gap-2 py-2 px-4 rounded-lg ${
                    saved
                      ? 'bg-FITZY-dark/50 text-FITZY-teal'
                      : useLocalData
                      ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                      : 'bg-FITZY-dark/30 hover:bg-FITZY-dark/50 text-white'
                  }`}
                >
                  <FiBookmark />
                  {saved ? 'Saved' : 'Save Workout'}
                </button>
              </div>
            )}

            {exercise.videoUrl && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Video Demonstration</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={exercise.videoUrl}
                    title={exercise.name}
                    className="w-full h-64 rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Link
                to={`/exercises/${exercise.category}`}
                className="text-sm bg-FITZY-teal/20 text-FITZY-teal px-3 py-1 rounded-full"
              >
                {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
              </Link>

              <span className="ml-3 flex items-center text-gray-400">
                <FiClock className="mr-1" />
                {exercise.duration} min
              </span>

              <span className="ml-3 flex items-center text-gray-400">
                <FiHeart className="mr-1" />
                {exercise.caloriesBurn} cal
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">{exercise.name}</h1>
            <p className="text-gray-300 mb-6">{exercise.description}</p>

            <div className="flex items-center mb-6">
              <span className="inline-block text-sm bg-FITZY-dark/70 text-white px-3 py-1 rounded-full">
                <FiAward className="inline mr-1" /> {exercise.difficulty}
              </span>

              {exercise.requiresSpace && (
                <span className="ml-3 inline-block text-sm bg-FITZY-dark/70 text-white px-3 py-1 rounded-full">
                  <FiHome className="inline mr-1" /> Requires Space
                </span>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Instructions</h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-2 pl-4">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="pl-2">{instruction}</li>
                ))}
              </ol>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Tips</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
                {exercise.tips.map((tip, index) => (
                  <li key={index} className="pl-2">{tip}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Equipment</h3>
                <ul className="text-gray-300 space-y-1">
                  {exercise.equipment.length > 0 ? exercise.equipment.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : <li>No equipment needed</li>}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Target Muscles</h3>
                <ul className="text-gray-300 space-y-1">
                  {exercise.targetMuscles.map((muscle, index) => (
                    <li key={index}>{muscle}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Exercises Section */}
        {relatedExercises.length > 0 && (
          <div className="p-8 border-t border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">Related Exercises</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedExercises.map(related => (
                <Link
                  key={related.id}
                  to={`/exercise/${related.id}`}
                  className="bg-FITZY-dark/30 rounded-lg overflow-hidden hover:bg-FITZY-dark/50 transition-colors"
                >
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-white">{related.name}</h4>
                    <div className="flex items-center mt-2 text-sm text-gray-400">
                      <span className="flex items-center">
                        <FiClock className="mr-1" /> {related.duration} min
                      </span>
                      <span className="ml-4 text-FITZY-teal">{related.difficulty}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
