// Type definitions for FitFlow app

export type ExerciseType = 'strength' | 'cardio' | 'hiit' | 'flexibility' | 'balance';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration: number; // in seconds
  type: ExerciseType;
  notes?: string;
}

export interface Routine {
  id: string;
  name: string;
  description?: string;
  type: ExerciseType;
  exercises: Exercise[];
  createdAt: number;
  lastPerformed?: number;
}

export interface WorkoutSession {
  id: string;
  routineId: string;
  startTime: number;
  endTime?: number;
  completedExercises: string[]; // ids of completed exercises
  caloriesBurned?: number;
}

export interface TimerState {
  isRunning: boolean;
  elapsed: number;
  duration: number;
}