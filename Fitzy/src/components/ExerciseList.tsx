import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiClock, FiFilter, FiSearch, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { getExercises } from '../services/exerciseService';
import { getLocalExercises } from '../services/seedService';
import { Exercise, CATEGORIES, ExerciseCategory } from '../models/exercises';

export default function ExerciseList() {
  const { category } = useParams<{ category: string }>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    difficulty: '',
    duration: '',
    equipment: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [useLocalData, setUseLocalData] = useState(false);
  const { userProfile } = useAuth();

  // Find category info for the current category
  const categoryInfo = CATEGORIES.find(
    c => c.id === (category as ExerciseCategory)
  );

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        let data: Exercise[] = [];

        try {
          // First try to get data from Firestore
          data = await getExercises(category as ExerciseCategory);

          // If no data or empty array, fall back to local data
          if (!data || data.length === 0) {
            setUseLocalData(true);
            data = getLocalExercises(category);
          }
        } catch (err) {
          // If Firestore fails, use local data
          console.warn('Error fetching from Firestore, using local data instead:', err);
          setUseLocalData(true);
          data = getLocalExercises(category);
        }

        setExercises(data);
        setFilteredExercises(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch exercises');
        setLoading(false);
      }
    };

    fetchExercises();
  }, [category]);

  // Filter and search exercises
  useEffect(() => {
    let result = [...exercises];

    // Apply search term
    if (searchTerm) {
      result = result.filter(
        exercise =>
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filterOptions.difficulty) {
      result = result.filter(
        exercise => exercise.difficulty === filterOptions.difficulty
      );
    }

    if (filterOptions.duration) {
      if (filterOptions.duration === 'short') {
        result = result.filter(exercise => exercise.duration <= 10);
      } else if (filterOptions.duration === 'medium') {
        result = result.filter(
          exercise => exercise.duration > 10 && exercise.duration <= 20
        );
      } else if (filterOptions.duration === 'long') {
        result = result.filter(exercise => exercise.duration > 20);
      }
    }

    if (filterOptions.equipment) {
      if (filterOptions.equipment === 'none') {
        result = result.filter(
          exercise => exercise.equipment.length === 0 ||
          (exercise.equipment.length === 1 && exercise.equipment[0].toLowerCase() === 'none')
        );
      } else {
        result = result.filter(
          exercise => exercise.equipment.some(
            eq => eq.toLowerCase().includes(filterOptions.equipment.toLowerCase())
          )
        );
      }
    }

    setFilteredExercises(result);
  }, [exercises, searchTerm, filterOptions]);

  const clearFilters = () => {
    setFilterOptions({
      difficulty: '',
      duration: '',
      equipment: '',
    });
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-white">
          <div className="animate-pulse">
            <div className="h-8 bg-FITZY-dark/70 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-FITZY-dark/70 rounded w-3/4 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-FITZY-dark/70 rounded h-64"></div>
              ))}
            </div>
          </div>
          <p className="mt-4">Loading exercises...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Header */}
      {categoryInfo && (
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            {categoryInfo.name}
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto">
            {categoryInfo.description}
          </p>
          {useLocalData && (
            <div className="mt-4 text-yellow-400 text-sm">
              Note: Using local exercise data. Connect to Firebase to access the full exercise database.
            </div>
          )}
        </div>
      )}

      {/* Filter & Search Section */}
      <div className="bg-FITZY-dark/50 rounded-lg p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search exercises..."
              className="w-full pl-10 pr-4 py-2 bg-FITZY-dark/70 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-FITZY-teal"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FiX />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-FITZY-dark/70 hover:bg-FITZY-dark/90 text-white rounded-md"
            >
              <FiFilter />
              Filters
              {(filterOptions.difficulty || filterOptions.duration || filterOptions.equipment) && (
                <span className="inline-block w-2 h-2 bg-FITZY-teal rounded-full"></span>
              )}
            </button>

            {(filterOptions.difficulty || filterOptions.duration || filterOptions.equipment) && (
              <button
                onClick={clearFilters}
                className="text-FITZY-teal hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-FITZY-dark/70 rounded-md">
            <div>
              <label className="block text-gray-300 mb-2">Difficulty</label>
              <select
                value={filterOptions.difficulty}
                onChange={e => setFilterOptions({ ...filterOptions, difficulty: e.target.value })}
                className="w-full px-3 py-2 bg-FITZY-dark/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-FITZY-teal"
              >
                <option value="">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Duration</label>
              <select
                value={filterOptions.duration}
                onChange={e => setFilterOptions({ ...filterOptions, duration: e.target.value })}
                className="w-full px-3 py-2 bg-FITZY-dark/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-FITZY-teal"
              >
                <option value="">All Durations</option>
                <option value="short">Short (≤ 10 min)</option>
                <option value="medium">Medium (11-20 min)</option>
                <option value="long">Long (20 min)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Equipment</label>
              <select
                value={filterOptions.equipment}
                onChange={e => setFilterOptions({ ...filterOptions, equipment: e.target.value })}
                className="w-full px-3 py-2 bg-FITZY-dark/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-FITZY-teal"
              >
                <option value="">All Equipment</option>
                <option value="none">No Equipment</option>
                <option value="chair">Chair</option>
                <option value="desk">Desk</option>
                <option value="resistance">Resistance Band</option>
                <option value="dumbbell">Dumbbells</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Exercise List */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map(exercise => (
            <Link
              key={exercise.id}
              to={`/exercise/${exercise.id}`}
              className="bg-FITZY-dark/50 rounded-lg overflow-hidden hover:bg-FITZY-dark/70 transition-colors"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                />
                {userProfile?.progress.completedExercises.includes(exercise.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Completed
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white flex items-center">
                      <FiClock className="mr-1" /> {exercise.duration} min
                    </span>
                    <span className="bg-FITZY-teal/20 text-FITZY-teal text-xs px-2 py-1 rounded-full">
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {exercise.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {exercise.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-FITZY-dark/30 rounded-lg">
          <p className="text-gray-300">No exercises found matching your criteria.</p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-FITZY-teal text-white rounded-md hover:bg-FITZY-teal/80"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
