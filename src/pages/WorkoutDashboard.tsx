import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ExerciseCard from '../components/exercise/ExerciseCard';
import { useWorkout } from '../hooks/useWorkout';
import { getRoutines } from '../utils/storage';
import { Play, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const WorkoutDashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeSession,
    routine,
    currentExerciseIndex,
    currentExercise,
    completedExercises,
    startWorkout,
    completeExercise,
    endWorkout,
    goToNextExercise,
    goToPreviousExercise,
    isExerciseCompleted,
    progress
  } = useWorkout();
  
  const [availableRoutines, setAvailableRoutines] = useState([]);
  
  // Load available routines
  useEffect(() => {
    setAvailableRoutines(getRoutines());
  }, []);
  
  // Handle workout completion
  const handleEndWorkout = () => {
    const session = endWorkout();
    if (session) {
      navigate('/summary', { state: { session } });
    }
  };
  
  // No active workout and no routines
  if (!activeSession && availableRoutines.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Workout" />
        
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-md">
            <AlertCircle size={48} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Routines Found</h2>
            <p className="text-gray-600 mb-6">
              You need to create a workout routine before you can start exercising.
            </p>
            <Button 
              variant="primary"
              onClick={() => navigate('/builder')}
            >
              Create Routine
            </Button>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // No active workout but routines available
  if (!activeSession) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Start Workout" />
        
        <div className="flex-1 p-4 pb-24">
          <h2 className="text-xl font-semibold mb-4">Select a Routine</h2>
          
          <div className="space-y-3">
            {availableRoutines.map(routine => (
              <Card
                key={routine.id}
                hoverable
                onClick={() => {
                  startWorkout(routine.id);
                }}
                className="flex items-center"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{routine.name}</h3>
                  <p className="text-sm text-gray-600">
                    {routine.exercises.length} exercises
                  </p>
                </div>
                <Button
                  variant="ghost"
                  icon={<Play size={18} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    startWorkout(routine.id);
                  }}
                >
                  Start
                </Button>
              </Card>
            ))}
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // Active workout
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Current Workout" showBackButton />
      
      <div className="flex-1 p-4 pb-24">
        {routine && (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{routine.name}</h2>
              <div className="flex items-center mt-1">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress * 100}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {completedExercises.length}/{routine.exercises.length}
                </span>
              </div>
            </div>
            
            {/* Current exercise */}
            {currentExercise && (
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Current Exercise</h3>
                <ExerciseCard
                  exercise={currentExercise}
                  isCompleted={isExerciseCompleted(currentExercise.id)}
                  onComplete={() => completeExercise(currentExercise.id)}
                />
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="flex justify-between mb-6">
              <Button
                variant="outline"
                onClick={goToPreviousExercise}
                disabled={currentExerciseIndex === 0}
                icon={<ChevronLeft size={16} />}
              >
                Previous
              </Button>
              
              <Button
                variant="outline"
                onClick={goToNextExercise}
                disabled={currentExerciseIndex === routine.exercises.length - 1}
                icon={<ChevronRight size={16} />}
              >
                Next
              </Button>
            </div>
            
            {/* All exercises */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">All Exercises</h3>
              <div className="space-y-3">
                {routine.exercises.map((exercise, index) => (
                  <Card 
                    key={exercise.id}
                    className={`transition-all duration-300 ${
                      index === currentExerciseIndex 
                        ? 'border-2 border-blue-500'
                        : ''
                    } ${
                      isExerciseCompleted(exercise.id) 
                        ? 'opacity-70'
                        : 'opacity-100'
                    }`}
                    onClick={() => {
                      if (index !== currentExerciseIndex) {
                        // Set current exercise index
                        // This is a simplified approach; in a real app
                        // you might use a context or state management library
                        for (let i = 0; i < index; i++) {
                          // This would be a better UX if implemented with proper state
                          // management, but for simplicity we're using direct index
                          if (index === currentExerciseIndex + 1) {
                            goToNextExercise();
                          } else if (index === currentExerciseIndex - 1) {
                            goToPreviousExercise();
                          } else {
                            // We don't support jumping multiple exercises in this demo
                          }
                        }
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h4 className="font-medium">{exercise.name}</h4>
                        <p className="text-sm text-gray-600">
                          {exercise.sets} sets × {exercise.reps} reps
                        </p>
                      </div>
                      
                      {isExerciseCompleted(exercise.id) ? (
                        <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      ) : (
                        <div className="h-6 w-6 border border-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* End workout button */}
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={handleEndWorkout}
            >
              End Workout
            </Button>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default WorkoutDashboard;