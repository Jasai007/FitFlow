import { useState, useEffect, useRef } from 'react';

interface UseTimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  autoStart?: boolean;
}

export const useTimer = ({ duration, onComplete, autoStart = false }: UseTimerProps) => {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<number | null>(null);
  
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };
  
  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setElapsed(0);
  };
  
  // Handle timer completion
  useEffect(() => {
    if (elapsed >= duration && isRunning) {
      setIsRunning(false);
      if (onComplete) {
        onComplete();
      }
    }
  }, [elapsed, duration, isRunning, onComplete]);
  
  // Set up and clean up interval
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);
  
  return {
    elapsed,
    isRunning,
    progress: duration > 0 ? Math.min(elapsed / duration, 1) : 0,
    startTimer,
    pauseTimer,
    resetTimer,
    timeLeft: Math.max(0, duration - elapsed)
  };
};