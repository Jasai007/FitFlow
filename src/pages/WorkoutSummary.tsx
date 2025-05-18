import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { WorkoutSession } from '../types';
import { getRoutineById } from '../utils/storage';
import { getMotivationalQuote } from '../utils/helpers';
import { Dumbbell, Calendar, Clock, Flame, Trophy } from 'lucide-react';

const WorkoutSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get session from location state
  const session = location.state?.session as WorkoutSession | undefined;
  
  // No session found
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Workout Summary" showBackButton />
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-4">
            <p className="mb-4">No workout data found.</p>
            <Button
              variant="primary"
              onClick={() => navigate('/workout')}
            >
              Start a Workout
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Get routine details
  const routine = getRoutineById(session.routineId);
  if (!routine) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Workout Summary" showBackButton />
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-4">
            <p className="mb-4">Routine not found.</p>
            <Button
              variant="primary"
              onClick={() => navigate('/workout')}
            >
              Start a Workout
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Calculate workout duration in minutes
  const duration = session.endTime && session.startTime
    ? Math.round((session.endTime - session.startTime) / 60000)
    : 0;
  
  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Calculate completion percentage
  const completionPercentage = routine.exercises.length > 0
    ? Math.round((session.completedExercises.length / routine.exercises.length) * 100)
    : 0;
  
  // Get motivational quote
  const quote = getMotivationalQuote();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Workout Complete" showBackButton />
      
      <div className="flex-1 p-4">
        {/* Workout completed banner */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-6 text-white text-center mb-6">
          <Trophy size={48} className="mx-auto mb-2" />
          <h2 className="text-2xl font-bold mb-1">Workout Complete!</h2>
          <p>{completionPercentage}% of exercises completed</p>
        </div>
        
        {/* Workout stats */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-3">{routine.name}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar size={20} className="text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">{formatDate(session.startTime)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock size={20} className="text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{duration} minutes</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Dumbbell size={20} className="text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Exercises</p>
                <p className="font-medium">{session.completedExercises.length} completed</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Flame size={20} className="text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Calories</p>
                <p className="font-medium">{session.caloriesBurned || '--'} burned</p>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Completed exercises */}
        <h3 className="text-lg font-semibold mb-3">Completed Exercises</h3>
        
        <div className="space-y-2 mb-6">
          {routine.exercises
            .filter(exercise => session.completedExercises.includes(exercise.id))
            .map(exercise => (
              <Card key={exercise.id}>
                <div className="flex items-center">
                  <div className="flex-1">
                    <h4 className="font-medium">{exercise.name}</h4>
                    <p className="text-sm text-gray-600">
                      {exercise.sets} sets × {exercise.reps} reps
                    </p>
                  </div>
                  <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </Card>
            ))}
          
          {/* Incomplete exercises */}
          {routine.exercises
            .filter(exercise => !session.completedExercises.includes(exercise.id))
            .length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Not Completed</h4>
                {routine.exercises
                  .filter(exercise => !session.completedExercises.includes(exercise.id))
                  .map(exercise => (
                    <Card key={exercise.id} className="opacity-60">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <h4 className="font-medium">{exercise.name}</h4>
                          <p className="text-sm text-gray-600">
                            {exercise.sets} sets × {exercise.reps} reps
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
        </div>
        
        {/* Motivational quote */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-center italic">
          "{quote}"
        </div>
        
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/routines')}
          >
            My Routines
          </Button>
          
          <Button
            variant="primary"
            onClick={() => navigate('/workout')}
          >
            New Workout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummary;