import { useState, useEffect } from 'react';
import { WorkoutSession, Routine, Exercise } from '../types';
import { getActiveSession, setActiveSession, saveSession, getRoutineById } from '../utils/storage';
import { generateId, calculateCalories } from '../utils/helpers';

export const useWorkout = () => {
  const [activeSession, setActiveSessionState] = useState<WorkoutSession | null>(null);
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  
  // Load active session from localStorage on mount
  useEffect(() => {
    const session = getActiveSession();
    if (session) {
      setActiveSessionState(session);
      setCompletedExercises(session.completedExercises);
      
      // Load the associated routine
      const routineData = getRoutineById(session.routineId);
      if (routineData) {
        setRoutine(routineData);
      }
    }
  }, []);
  
  // Start a new workout session
  const startWorkout = (routineId: string) => {
    const routineData = getRoutineById(routineId);
    if (!routineData) return false;
    
    const newSession: WorkoutSession = {
      id: generateId(),
      routineId,
      startTime: Date.now(),
      completedExercises: []
    };
    
    setActiveSession(newSession);
    setActiveSessionState(newSession);
    setRoutine(routineData);
    setCompletedExercises([]);
    setCurrentExerciseIndex(0);
    
    return true;
  };
  
  // Mark an exercise as completed
  const completeExercise = (exerciseId: string) => {
    if (!activeSession) return;
    
    // Add to completed exercises if not already there
    if (!completedExercises.includes(exerciseId)) {
      const updatedCompleted = [...completedExercises, exerciseId];
      setCompletedExercises(updatedCompleted);
      
      // Update active session in state and storage
      const updatedSession = {
        ...activeSession,
        completedExercises: updatedCompleted
      };
      
      setActiveSessionState(updatedSession);
      setActiveSession(updatedSession);
      
      // Move to next exercise if available
      if (routine && currentExerciseIndex < routine.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
      }
    }
  };
  
  // End the current workout session
  const endWorkout = () => {
    if (!activeSession || !routine) return;
    
    // Calculate calories burned (simplified)
    const totalDuration = routine.exercises.reduce((total, ex) => {
      // Only count completed exercises
      return completedExercises.includes(ex.id) 
        ? total + ex.duration * ex.sets 
        : total;
    }, 0);
    
    const caloriesBurned = calculateCalories(totalDuration, routine.type);
    
    // Create complete session
    const completedSession: WorkoutSession = {
      ...activeSession,
      endTime: Date.now(),
      completedExercises,
      caloriesBurned
    };
    
    // Save to storage and clear active session
    saveSession(completedSession);
    setActiveSession(null);
    
    // Clear state
    setActiveSessionState(null);
    setRoutine(null);
    setCompletedExercises([]);
    
    return completedSession;
  };
  
  // Get current exercise
  const getCurrentExercise = (): Exercise | null => {
    if (!routine || routine.exercises.length === 0) return null;
    return routine.exercises[currentExerciseIndex];
  };
  
  // Move to next exercise manually
  const goToNextExercise = () => {
    if (!routine) return;
    
    if (currentExerciseIndex < routine.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  };
  
  // Move to previous exercise manually
  const goToPreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  };
  
  return {
    activeSession,
    routine,
    completedExercises,
    currentExerciseIndex,
    currentExercise: getCurrentExercise(),
    isExerciseCompleted: (id: string) => completedExercises.includes(id),
    progress: routine 
      ? completedExercises.length / routine.exercises.length
      : 0,
    startWorkout,
    completeExercise,
    endWorkout,
    goToNextExercise,
    goToPreviousExercise
  };
};