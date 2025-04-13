import { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FiTrendingUp, FiTarget, FiDroplet, FiActivity, FiClock } from 'react-icons/fi';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Initial mock data
const initialData = {
  water: Array(7).fill(0),
  exercise: Array(7).fill(0),
  calories: Array(7).fill(0),
};

// Weekly goals initial values
const initialGoals = {
  water: 2000, // ml per day
  exercise: 30, // minutes per day
  calories: 2000, // calories per day
};

// Days of the week labels
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const DailyTracker = () => {
  const [formData, setFormData] = useState({
    water: '',
    exercise: '',
    calories: '',
  });

  const [weeklyData, setWeeklyData] = useState(() => {
    // Try to load from localStorage if available
    const savedData = localStorage.getItem('weeklyData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('weeklyGoals');
    return savedGoals ? JSON.parse(savedGoals) : initialGoals;
  });

  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().getDay();
    // Convert to our array index (0 = Monday, 6 = Sunday)
    return today === 0 ? 6 : today - 1;
  });

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('weeklyData', JSON.stringify(weeklyData));
    localStorage.setItem('weeklyGoals', JSON.stringify(goals));
  }, [weeklyData, goals]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update the weekly data for the selected day
    const newWeeklyData = { ...weeklyData };

    if (formData.water) {
      newWeeklyData.water = [...weeklyData.water];
      newWeeklyData.water[selectedDay] = Number.parseInt(formData.water);
    }

    if (formData.exercise) {
      newWeeklyData.exercise = [...weeklyData.exercise];
      newWeeklyData.exercise[selectedDay] = Number.parseInt(formData.exercise);
    }

    if (formData.calories) {
      newWeeklyData.calories = [...weeklyData.calories];
      newWeeklyData.calories[selectedDay] = Number.parseInt(formData.calories);
    }

    setWeeklyData(newWeeklyData);
    setFormData({ water: '', exercise: '', calories: '' });
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoals({
      ...goals,
      [name]: Number.parseInt(value),
    });
  };

  // Calculate progress percentages for the weekly summary
  const calculateProgress = () => {
    const waterTotal = weeklyData.water.reduce((acc: number, val: number) => acc + val, 0);
    const exerciseTotal = weeklyData.exercise.reduce((acc: number, val: number) => acc + val, 0);
    const caloriesTotal = weeklyData.calories.reduce((acc: number, val: number) => acc + val, 0);

    const waterGoalTotal = goals.water * 7;
    const exerciseGoalTotal = goals.exercise * 7;
    const caloriesGoalTotal = goals.calories * 7;

    return {
      water: Math.min(100, Math.round((waterTotal / waterGoalTotal) * 100)),
      exercise: Math.min(100, Math.round((exerciseTotal / exerciseGoalTotal) * 100)),
      calories: Math.min(100, Math.round((caloriesTotal / caloriesGoalTotal) * 100)),
    };
  };

  const progress = calculateProgress();

  // Get motivational message based on progress
  const getMotivationalMessage = () => {
    const avgProgress = (progress.water + progress.exercise + progress.calories) / 3;

    if (avgProgress >= 90) {
      return "Excellent work! You're crushing your goals!";
    }
    if (avgProgress >= 70) {
      return "Great job! You're making fantastic progress!";
    }
    if (avgProgress >= 50) {
      return "You're on the right track! Keep pushing!";
    }
    if (avgProgress >= 30) {
      return "Good start! Keep going to reach your goals!";
    }
    return "Every step counts. Let's make progress this week!";
  };

  // Chart options and data
  const waterChartData = {
    labels: weekDays,
    datasets: [
      {
        label: 'Water Intake (ml)',
        data: weeklyData.water,
        backgroundColor: 'rgba(83, 179, 134, 0.6)',
        borderColor: 'rgba(83, 179, 134, 1)',
        borderWidth: 2,
      },
    ],
  };

  const exerciseChartData = {
    labels: weekDays,
    datasets: [
      {
        label: 'Exercise (minutes)',
        data: weeklyData.exercise,
        backgroundColor: 'rgba(73, 85, 131, 0.6)',
        borderColor: 'rgba(73, 85, 131, 1)',
        borderWidth: 2,
      },
    ],
  };

  const caloriesChartData = {
    labels: weekDays,
    datasets: [
      {
        label: 'Calories',
        data: weeklyData.calories,
        backgroundColor: 'rgba(160, 87, 61, 0.6)',
        borderColor: 'rgba(160, 87, 61, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
  };

  return (
    <section id="daily-tracker" className="py-16 bg-FITZY-dark">
      <div className="FITZY-container">
        <h2 className="section-title text-center">Daily Fitness Tracker</h2>
        <p className="section-subtitle text-center mb-16">
          Track your daily progress, set goals, and visualize your journey to better health.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Daily Input Form */}
          <div className="card p-6 space-y-6">
            <h3 className="text-2xl font-semibold text-white flex items-center">
              <FiActivity className="mr-2 text-FITZY-teal" /> Daily Input
            </h3>

            <div className="flex flex-wrap gap-3 mb-4">
              {weekDays.map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(index)}
                  className={`px-3 py-1 rounded ${
                    selectedDay === index
                      ? 'bg-FITZY-teal text-white'
                      : 'bg-FITZY-charcoal/30 text-white'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="water" className="block mb-2 text-sm font-medium text-gray-300">
                  Water Intake (ml)
                </label>
                <input
                  type="number"
                  id="water"
                  name="water"
                  value={formData.water}
                  onChange={handleInputChange}
                  placeholder={`Water intake for ${weekDays[selectedDay]}`}
                  className="w-full p-2.5 bg-FITZY-charcoal text-white rounded-md border border-FITZY-charcoal focus:ring-FITZY-teal focus:border-FITZY-teal"
                />
              </div>

              <div>
                <label htmlFor="exercise" className="block mb-2 text-sm font-medium text-gray-300">
                  Exercise Duration (minutes)
                </label>
                <input
                  type="number"
                  id="exercise"
                  name="exercise"
                  value={formData.exercise}
                  onChange={handleInputChange}
                  placeholder={`Exercise minutes for ${weekDays[selectedDay]}`}
                  className="w-full p-2.5 bg-FITZY-charcoal text-white rounded-md border border-FITZY-charcoal focus:ring-FITZY-teal focus:border-FITZY-teal"
                />
              </div>

              <div>
                <label htmlFor="calories" className="block mb-2 text-sm font-medium text-gray-300">
                  Calories Consumed
                </label>
                <input
                  type="number"
                  id="calories"
                  name="calories"
                  value={formData.calories}
                  onChange={handleInputChange}
                  placeholder={`Calories for ${weekDays[selectedDay]}`}
                  className="w-full p-2.5 bg-FITZY-charcoal text-white rounded-md border border-FITZY-charcoal focus:ring-FITZY-teal focus:border-FITZY-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-center py-3"
              >
                Log Daily Activity
              </button>
            </form>
          </div>

          {/* Weekly Goals */}
          <div className="card p-6 space-y-6">
            <h3 className="text-2xl font-semibold text-white flex items-center">
              <FiTarget className="mr-2 text-FITZY-teal" /> Weekly Goals
            </h3>

            <form className="space-y-4">
              <div>
                <label htmlFor="waterGoal" className="block mb-2 text-sm font-medium text-gray-300">
                  Daily Water Goal (ml)
                </label>
                <input
                  type="number"
                  id="waterGoal"
                  name="water"
                  value={goals.water}
                  onChange={handleGoalChange}
                  className="w-full p-2.5 bg-FITZY-charcoal text-white rounded-md border border-FITZY-charcoal focus:ring-FITZY-teal focus:border-FITZY-teal"
                />
              </div>

              <div>
                <label htmlFor="exerciseGoal" className="block mb-2 text-sm font-medium text-gray-300">
                  Daily Exercise Goal (minutes)
                </label>
                <input
                  type="number"
                  id="exerciseGoal"
                  name="exercise"
                  value={goals.exercise}
                  onChange={handleGoalChange}
                  className="w-full p-2.5 bg-FITZY-charcoal text-white rounded-md border border-FITZY-charcoal focus:ring-FITZY-teal focus:border-FITZY-teal"
                />
              </div>

              <div>
                <label htmlFor="caloriesGoal" className="block mb-2 text-sm font-medium text-gray-300">
                  Daily Calorie Goal
                </label>
                <input
                  type="number"
                  id="caloriesGoal"
                  name="calories"
                  value={goals.calories}
                  onChange={handleGoalChange}
                  className="w-full p-2.5 bg-FITZY-charcoal text-white rounded-md border border-FITZY-charcoal focus:ring-FITZY-teal focus:border-FITZY-teal"
                />
              </div>
            </form>

            {/* Weekly Progress Summary */}
            <div className="pt-4 border-t border-FITZY-charcoal/50">
              <h4 className="text-xl font-semibold text-white flex items-center mb-4">
                <FiTrendingUp className="mr-2 text-FITZY-teal" /> Weekly Progress
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">Water Intake</span>
                    <span className="text-sm font-medium text-FITZY-teal">{progress.water}%</span>
                  </div>
                  <div className="w-full bg-FITZY-charcoal rounded-full h-2.5">
                    <div
                      className="bg-FITZY-teal h-2.5 rounded-full"
                      style={{ width: `${progress.water}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">Exercise</span>
                    <span className="text-sm font-medium text-FITZY-teal">{progress.exercise}%</span>
                  </div>
                  <div className="w-full bg-FITZY-charcoal rounded-full h-2.5">
                    <div
                      className="bg-FITZY-blue h-2.5 rounded-full"
                      style={{ width: `${progress.exercise}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-300">Calories</span>
                    <span className="text-sm font-medium text-FITZY-teal">{progress.calories}%</span>
                  </div>
                  <div className="w-full bg-FITZY-charcoal rounded-full h-2.5">
                    <div
                      className="bg-FITZY-orange h-2.5 rounded-full"
                      style={{ width: `${progress.calories}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-FITZY-teal/10 rounded-md border border-FITZY-teal/30">
                <p className="text-white text-center font-medium">
                  {getMotivationalMessage()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-white flex items-center mb-8">
            <FiDroplet className="mr-2 text-FITZY-teal" /> Progress Visualization
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-4">
              <h4 className="text-lg font-medium text-white mb-4">Water Intake</h4>
              <div className="h-64">
                <Bar data={waterChartData} options={chartOptions} />
              </div>
            </div>

            <div className="card p-4">
              <h4 className="text-lg font-medium text-white mb-4">Exercise Duration</h4>
              <div className="h-64">
                <Bar data={exerciseChartData} options={chartOptions} />
              </div>
            </div>

            <div className="card p-4">
              <h4 className="text-lg font-medium text-white mb-4">Calories Consumed</h4>
              <div className="h-64">
                <Bar data={caloriesChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyTracker;
