import { useState, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  subMonths,
  addMonths,
  parseISO,
  getMonth,
  getYear
} from 'date-fns';
import { FiChevronLeft, FiChevronRight, FiActivity } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { getUserWorkoutSessions } from '../services/exerciseService';
import { WorkoutSession } from '../models/exercises';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [workoutData, setWorkoutData] = useState<WorkoutSession[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, userProfile } = useAuth();

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  useEffect(() => {
    const fetchWorkoutData = async () => {
      if (!currentUser) return;

      setIsLoading(true);
      try {
        const workouts = await getUserWorkoutSessions(currentUser.uid);

        // Filter workouts for the current month
        const currentMonthWorkouts = workouts.filter(workout => {
          const workoutDate = parseISO(workout.date);
          return getMonth(workoutDate) === getMonth(currentDate) &&
                 getYear(workoutDate) === getYear(currentDate);
        });

        setWorkoutData(currentMonthWorkouts);
      } catch (error) {
        console.error('Error fetching workout data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkoutData();
  }, [currentUser, currentDate]);

  const hasWorkout = (date: Date) => {
    return workoutData.some(workout =>
      isSameDay(parseISO(workout.date), date)
    );
  };

  const getWorkoutForDay = (date: Date): WorkoutSession | null => {
    return workoutData.find(workout =>
      isSameDay(parseISO(workout.date), date)
    ) || null;
  };

  const handleDayClick = (date: Date) => {
    setSelectedDay(date);
    const workout = getWorkoutForDay(date);
    setSelectedWorkout(workout);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate =>
      direction === 'prev' ? subMonths(prevDate, 1) : addMonths(prevDate, 1)
    );
    setSelectedDay(null);
    setSelectedWorkout(null);
  };

  // Prepare chart data
  const getChartData = () => {
    // If user is not logged in or has no profile, return empty datasets
    if (!userProfile) {
      return {
        labels: [],
        datasets: [],
      };
    }

    // Get the last 7 days
    const today = new Date();
    const labels = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return format(date, 'EEE');
    });

    // Calculate calories for each day
    const caloriesData = Array(7).fill(0);
    const minutesData = Array(7).fill(0);

    workoutData.forEach(workout => {
      const workoutDate = parseISO(workout.date);
      const dayDiff = Math.round(
        (today.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDiff >= 0 && dayDiff < 7) {
        const index = 6 - dayDiff;
        caloriesData[index] += workout.caloriesBurned;
        minutesData[index] += workout.totalDuration;
      }
    });

    return {
      labels,
      datasets: [
        {
          label: 'Calories Burned',
          data: caloriesData,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          yAxisID: 'y',
        },
        {
          label: 'Minutes Exercised',
          data: minutesData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y1',
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Calories',
          color: 'rgb(75, 192, 192)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Minutes',
          color: 'rgb(255, 99, 132)',
        },
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
  };

  return (
    <section id="calendar" className="py-16 bg-FITZY-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Track Your Progress</h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Monitor your fitness journey over time and stay motivated by seeing your progress at a glance.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Summary */}
          <div className="bg-FITZY-dark/50 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FiActivity className="mr-2" /> Your Stats
            </h3>

            {currentUser && userProfile ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Current Streak</span>
                    <span className="text-2xl font-bold text-FITZY-teal">
                      {userProfile.progress.streakDays} days
                    </span>
                  </div>
                  <div className="w-full bg-FITZY-dark/70 rounded-full h-2">
                    <div
                      className="bg-FITZY-teal h-2 rounded-full"
                      style={{ width: `${Math.min(userProfile.progress.streakDays * 5, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-FITZY-dark/40 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Total Workouts</span>
                    <div className="text-xl font-bold text-white">
                      {userProfile.progress.stats.workoutsCompleted}
                    </div>
                  </div>

                  <div className="bg-FITZY-dark/40 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Calories Burned</span>
                    <div className="text-xl font-bold text-white">
                      {userProfile.progress.stats.caloriesBurned}
                    </div>
                  </div>

                  <div className="bg-FITZY-dark/40 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Minutes Exercised</span>
                    <div className="text-xl font-bold text-white">
                      {userProfile.progress.stats.minutesExercised}
                    </div>
                  </div>

                  <div className="bg-FITZY-dark/40 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Exercises Done</span>
                    <div className="text-xl font-bold text-white">
                      {userProfile.progress.completedExercises.length}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Weekly Progress</h4>
                  <div className="p-2 rounded-lg bg-FITZY-dark/40">
                    <Line options={chartOptions} data={getChartData()} height={180} />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">Sign in to track your workout progress</p>
                <a
                  href="/login"
                  className="inline-block bg-FITZY-teal hover:bg-FITZY-teal/80 text-white px-4 py-2 rounded-md"
                >
                  Sign In
                </a>
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="bg-FITZY-dark/50 rounded-lg p-6 shadow-lg lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigateMonth('prev')}
                className="text-white hover:text-FITZY-teal"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              <h3 className="text-xl font-semibold text-white">
                {format(currentDate, 'MMMM yyyy')}
              </h3>

              <button
                onClick={() => navigateMonth('next')}
                className="text-white hover:text-FITZY-teal"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map(day => (
                <button
                  key={day.toString()}
                  onClick={() => handleDayClick(day)}
                  className={`p-2 h-12 text-center rounded-lg
                    ${
                      isSameMonth(day, currentDate)
                        ? 'text-white'
                        : 'text-gray-500'
                    }
                    ${
                      isToday(day)
                        ? 'bg-FITZY-teal'
                        : hasWorkout(day)
                        ? 'bg-green-500/20'
                        : 'hover:bg-FITZY-dark/30'
                    }
                    ${
                      selectedDay && isSameDay(day, selectedDay) && !isToday(day)
                        ? 'ring-2 ring-FITZY-teal'
                        : ''
                    }
                  `}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    {format(day, 'd')}
                    {hasWorkout(day) && !isToday(day) && (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Day Workout Details */}
            {selectedDay && (
              <div className="mt-6 border-t border-gray-800 pt-4">
                <h4 className="text-lg font-semibold text-white mb-3">
                  {format(selectedDay, 'MMMM d, yyyy')}
                </h4>

                {selectedWorkout ? (
                  <div className="bg-FITZY-dark/40 p-4 rounded-lg">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-300">Duration</span>
                      <span className="text-white font-semibold">{selectedWorkout.totalDuration} min</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-300">Calories</span>
                      <span className="text-white font-semibold">{selectedWorkout.caloriesBurned} cal</span>
                    </div>
                    <div className="mt-4">
                      <h5 className="text-white font-medium mb-2">Exercises</h5>
                      <ul className="text-gray-300 space-y-2">
                        {selectedWorkout.exercises.map((ex, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{ex.exerciseId}</span>
                            <span>{ex.sets} sets × {ex.reps} reps</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {selectedWorkout.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <h5 className="text-white font-medium mb-2">Notes</h5>
                        <p className="text-gray-300">{selectedWorkout.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-FITZY-dark/40 p-4 rounded-lg text-center">
                    <p className="text-gray-400">No workout recorded for this day.</p>
                    <button
                      className="mt-3 text-FITZY-teal hover:underline"
                      onClick={() => {
                        /* Logic to add a workout for this day */
                      }}
                    >
                      Add Workout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
