import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CATEGORIES, CategoryInfo } from '../models/exercises';
import { useAuth } from '../contexts/AuthContext';

// Exercise classes data
const exerciseClasses = [
  {
    id: 'Office',
    name: 'Office',
    description: 'Boost your energy and productivity with simple exercises that can be done in business attire without breaking a sweat.',
    image: '/class-images/cardio.jpg'
  },
  {
    id: 'Home',
    name: 'Home',
    description: 'Transform daily household activities into effective workouts that fit seamlessly between chores while toning muscles and burning calories without special equipment.',
    image: '/class-images/strength.jpg'
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    description: 'Combine elements of cardio and strength training for a balanced fitness routine.',
    image: '/class-images/hybrid.jpg'
  },
  {
    id: 'hiit',
    name: 'HIIT',
    description: 'High-intensity interval training with short, intense activity bursts and brief rest periods.',
    image: '/class-images/hiit.jpg'
  },
];

// Placeholder image component
const PlaceholderImage = ({ name, color }: { name: string, color?: string }) => {
  // Create a placeholder with a gradient background
  const getGradient = (name: string) => {
    // Simple hash function to get a consistent color based on name
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = hash % 360;
    const hue2 = (hue1 + 40) % 360;

    return `linear-gradient(135deg, hsl(${hue1}, 70%, 40%), hsl(${hue2}, 70%, 25%))`;
  };

  return (
    <div
      className="w-full h-full rounded-lg flex items-center justify-center"
      style={{ background: color || getGradient(name) }}
    >
      <span className="text-white text-xl font-bold">{name}</span>
    </div>
  );
};

const ExerciseClasses = () => {
  const { currentUser, userProfile } = useAuth();
  const [categories, setCategories] = useState<CategoryInfo[]>(CATEGORIES);

  return (
    <section id="exercise-classes" className="py-16 bg-FITZY-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Exercise Categories</h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
          With a comprehensive selection of fitness classes tailored for every environment,
          we ensure there's something that fits into your daily routine.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exerciseClasses.map((exerciseClass) => (
            <Link
              key={exerciseClass.id}
              to={`/exercises/${exerciseClass.id}`}
              className="card overflow-hidden group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="h-48 relative">
                <PlaceholderImage name={exerciseClass.name} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-FITZY-dark/70">
                  <FiPlusCircle className="w-12 h-12 text-FITZY-teal" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{exerciseClass.name}</h3>
                <p className="text-sm text-gray-400">{exerciseClass.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Workouts Section */}
        {userProfile && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">Recommended For You</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-FITZY-dark/50 rounded-lg p-6 border border-gray-800 hover:border-FITZY-teal transition-colors">
                <h4 className="text-xl font-semibold text-white mb-2">Office Desk Stretch</h4>
                <p className="text-gray-400 mb-4">A quick 5-minute routine to relieve tension and improve posture during your workday.</p>
                <Link to="/exercises/office/desk-stretch" className="text-FITZY-teal hover:underline">Start Workout →</Link>
              </div>

              <div className="bg-FITZY-dark/50 rounded-lg p-6 border border-gray-800 hover:border-FITZY-teal transition-colors">
                <h4 className="text-xl font-semibold text-white mb-2">Home No-Equipment</h4>
                <p className="text-gray-400 mb-4">A complete body workout that requires no special equipment, perfect for home fitness enthusiasts.</p>
                <Link to="/exercises/home/no-equipment" className="text-FITZY-teal hover:underline">Start Workout →</Link>
              </div>

              <div className="bg-FITZY-dark/50 rounded-lg p-6 border border-gray-800 hover:border-FITZY-teal transition-colors">
                <h4 className="text-xl font-semibold text-white mb-2">10-Minute HIIT</h4>
                <p className="text-gray-400 mb-4">An intense, time-efficient workout that alternates between 20 seconds of hard work and 10 seconds of rest.</p>
                <Link to="/exercises/hiit/ten-minute" className="text-FITZY-teal hover:underline">Start Workout →</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExerciseClasses;
