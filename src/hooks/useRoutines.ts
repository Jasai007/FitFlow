import { useState, useEffect } from 'react';
import { Routine, Exercise, ExerciseType } from '../types';
import { getRoutines, saveRoutine, deleteRoutine } from '../utils/storage';
import { generateId } from '../utils/helpers';

export const useRoutines = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load routines from localStorage
  useEffect(() => {
    setRoutines(getRoutines());
    setLoading(false);
  }, []);
  
  // Create a new routine
  const createRoutine = (name: string, type: ExerciseType, description?: string) => {
    const newRoutine: Routine = {
      id: generateId(),
      name,
      description,
      type,
      exercises: [],
      createdAt: Date.now()
    };
    
    saveRoutine(newRoutine);
    setRoutines(prev => [...prev, newRoutine]);
    return newRoutine.id;
  };
  
  // Update an existing routine
  const updateRoutine = (updatedRoutine: Routine) => {
    saveRoutine(updatedRoutine);
    setRoutines(prev => 
      prev.map(routine => 
        routine.id === updatedRoutine.id ? updatedRoutine : routine
      )
    );
  };
  
  // Delete a routine
  const removeRoutine = (routineId: string) => {
    deleteRoutine(routineId);
    setRoutines(prev => prev.filter(routine => routine.id !== routineId));
  };
  
  // Add an exercise to a routine
  const addExerciseToRoutine = (routineId: string, exercise: Omit<Exercise, 'id'>) => {
    const routine = routines.find(r => r.id === routineId);
    if (!routine) return;
    
    const newExercise: Exercise = {
      ...exercise,
      id: generateId()
    };
    
    const updatedRoutine: Routine = {
      ...routine,
      exercises: [...routine.exercises, newExercise]
    };
    
    updateRoutine(updatedRoutine);
    return newExercise.id;
  };
  
  // Update an exercise in a routine
  const updateExerciseInRoutine = (routineId: string, updatedExercise: Exercise) => {
    const routine = routines.find(r => r.id === routineId);
    if (!routine) return;
    
    const updatedRoutine: Routine = {
      ...routine,
      exercises: routine.exercises.map(exercise => 
        exercise.id === updatedExercise.id ? updatedExercise : exercise
      )
    };
    
    updateRoutine(updatedRoutine);
  };
  
  // Remove an exercise from a routine
  const removeExerciseFromRoutine = (routineId: string, exerciseId: string) => {
    const routine = routines.find(r => r.id === routineId);
    if (!routine) return;
    
    const updatedRoutine: Routine = {
      ...routine,
      exercises: routine.exercises.filter(exercise => exercise.id !== exerciseId)
    };
    
    updateRoutine(updatedRoutine);
  };
  
  // Reorder exercises in a routine
  const reorderExercises = (routineId: string, newExerciseOrder: Exercise[]) => {
    const routine = routines.find(r => r.id === routineId);
    if (!routine) return;
    
    const updatedRoutine: Routine = {
      ...routine,
      exercises: newExerciseOrder
    };
    
    updateRoutine(updatedRoutine);
  };
  
  // Filter routines by type
  const getRoutinesByType = (type: ExerciseType | 'all') => {
    if (type === 'all') {
      return routines;
    }
    return routines.filter(routine => routine.type === type);
  };
  
  return {
    routines,
    loading,
    createRoutine,
    updateRoutine,
    removeRoutine,
    addExerciseToRoutine,
    updateExerciseInRoutine,
    removeExerciseFromRoutine,
    reorderExercises,
    getRoutinesByType
  };
};