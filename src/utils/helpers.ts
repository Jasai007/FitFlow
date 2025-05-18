// Helper functions

import { ExerciseType } from '../types';

// Generate a random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Format seconds to MM:SS
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Calculate calories burned (very rough estimate)
export const calculateCalories = (
  durationInSeconds: number, 
  exerciseType: ExerciseType
): number => {
  // Very simplified calorie calculation
  const minutesWorked = durationInSeconds / 60;
  const baseCaloriesPerMinute = {
    'cardio': 10,
    'hiit': 12,
    'strength': 8,
    'flexibility': 4,
    'balance': 5
  };
  
  return Math.round(minutesWorked * (baseCaloriesPerMinute[exerciseType] || 8));
};

// Get a random motivational quote
export const getMotivationalQuote = (): string => {
  const quotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
    "No matter how slow you go, you are still lapping everybody on the couch.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
    "The hardest lift of all is lifting your butt off the couch.",
    "Rome wasn't built in a day, but they were laying bricks every hour.",
    "The only place where success comes before work is in the dictionary.",
    "Don't wish for it, work for it.",
    "The difference between try and triumph is just a little umph!"
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};

// Exercise type to color mapping
export const getTypeColor = (type: ExerciseType): string => {
  const colorMap: Record<ExerciseType, string> = {
    'strength': 'bg-blue-500',
    'cardio': 'bg-green-500',
    'hiit': 'bg-orange-500',
    'flexibility': 'bg-purple-500',
    'balance': 'bg-teal-500'
  };
  
  return colorMap[type] || 'bg-gray-500';
};

// Get exercise type options for select inputs
export const getExerciseTypeOptions = () => [
  { value: 'strength', label: 'Strength' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'hiit', label: 'HIIT' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'balance', label: 'Balance' }
];