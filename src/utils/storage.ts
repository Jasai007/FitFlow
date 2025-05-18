// Utility functions for localStorage operations

import { Routine, WorkoutSession } from '../types';

// Local storage keys
const ROUTINES_KEY = 'fitflow_routines';
const SESSIONS_KEY = 'fitflow_sessions';
const ACTIVE_SESSION_KEY = 'fitflow_active_session';

// Routine functions
export const getRoutines = (): Routine[] => {
  const data = localStorage.getItem(ROUTINES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRoutine = (routine: Routine): void => {
  const routines = getRoutines();
  const index = routines.findIndex(r => r.id === routine.id);
  
  if (index >= 0) {
    routines[index] = routine;
  } else {
    routines.push(routine);
  }
  
  localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines));
};

export const deleteRoutine = (id: string): void => {
  const routines = getRoutines().filter(r => r.id !== id);
  localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines));
};

export const getRoutineById = (id: string): Routine | undefined => {
  return getRoutines().find(r => r.id === id);
};

// Session functions
export const getSessions = (): WorkoutSession[] => {
  const data = localStorage.getItem(SESSIONS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveSession = (session: WorkoutSession): void => {
  const sessions = getSessions();
  const index = sessions.findIndex(s => s.id === session.id);
  
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
};

export const getActiveSession = (): WorkoutSession | null => {
  const data = localStorage.getItem(ACTIVE_SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const setActiveSession = (session: WorkoutSession | null): void => {
  if (session) {
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  }
};

export const clearActiveSession = (): void => {
  localStorage.removeItem(ACTIVE_SESSION_KEY);
};