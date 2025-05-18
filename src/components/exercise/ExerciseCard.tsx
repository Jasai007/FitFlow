import React, { useRef, useState } from 'react';
import { Exercise } from '../../types';
import Card from '../ui/Card';
import CircularTimer from '../ui/CircularTimer';
import Button from '../ui/Button';
import { useTimer } from '../../hooks/useTimer';
import { Check, Play, Pause, RotateCcw } from 'lucide-react';
import { getTypeColor } from '../../utils/helpers';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted: boolean;
  onComplete: () => void;
  className?: string;
  onRestart?: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isCompleted,
  onComplete,
  className = '',
  onRestart
}) => {
  const timerRef = useRef<() => void>();
  const [currentSet, setCurrentSet] = useState(1);

  const playAlertSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 880;
      g.gain.value = 0.2;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.25);
      o.onended = () => ctx.close();
    } catch (e) { /* ignore */ }
  };

  const handleTimerComplete = () => {
    playAlertSound();
    if (currentSet < exercise.sets) {
      setCurrentSet(currentSet + 1);
      resetTimer();
    } else {
      resetTimer();
      setCurrentSet(1);
      onComplete();
    }
  };

  const handleManualComplete = () => {
    resetTimer();
    setCurrentSet(1);
    onComplete();
  };

  const {
    elapsed,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer
  } = useTimer({
    duration: exercise.duration,
    onComplete: handleTimerComplete
  });
  timerRef.current = resetTimer;
  
  return (
    <Card
      className={`w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl ${className} transition-all duration-300 ${isCompleted ? 'opacity-70' : 'opacity-100'}`}
    >
      {/* Exercise details at the top */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold mb-2">{exercise.name}</h3>
        <div className={`inline-block px-3 py-1 text-sm text-white rounded-full ${getTypeColor(exercise.type)} mb-2`}>
          {exercise.type}
        </div>
        <div className="text-lg text-gray-700 mb-1">
          {exercise.sets} sets × {exercise.reps} reps
        </div>
        {exercise.notes && <div className="text-sm text-gray-500 italic">{exercise.notes}</div>}
      </div>

      {/* Timer and buttons below */}
      <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl py-6">
        <div className="mb-2 text-lg font-semibold text-blue-600">
          Set {currentSet} of {exercise.sets}
        </div>
        {exercise.duration > 0 ? (
          <>
            <CircularTimer
              duration={exercise.duration}
              elapsed={elapsed}
              isRunning={isRunning}
              size={120}
            />
            <div className="mt-6 flex space-x-4 justify-center">
              {!isCompleted ? (
                <>
                  {isRunning ? (
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={pauseTimer}
                      icon={<Pause size={40} />}
                      className="p-3 h-16 w-16"
                    >
                      {''}
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={startTimer}
                      icon={<Play size={40} />}
                      className="p-3 h-16 w-16"
                    >
                      {''}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => {
                      resetTimer();
                      setCurrentSet(1);
                    }}
                    icon={<RotateCcw size={40} />}
                    className="p-3 h-16 w-16"
                  >
                    {''}
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handleManualComplete}
                    icon={<Check size={32} />}
                    className="p-3 h-16 w-16 text-green-600"
                  >
                    {''}
                  </Button>
                </>
              ) : (
                <div className="flex items-center justify-center h-16 w-16 bg-green-100 text-green-600 rounded-full">
                  <Check size={32} />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 text-xl text-gray-700 font-semibold">
              {exercise.reps} reps per set
            </div>
            <div className="mt-6">
              {currentSet <= exercise.sets ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    if (currentSet < exercise.sets) {
                      setCurrentSet(currentSet + 1);
                    } else {
                      setCurrentSet(1);
                      onComplete();
                    }
                  }}
                  className="px-8 py-3"
                >
                  {currentSet < exercise.sets
                    ? `Complete Set ${currentSet} of ${exercise.sets}`
                    : `Finish Exercise`}
                </Button>
              ) : null}
            </div>
          </>
        )}
      </div>

      {/* Progress indicator */}
      {isCompleted && (
        <>
          <div className="mt-4 w-full bg-green-100 h-1 rounded-full">
            <div className="bg-green-500 h-1 rounded-full w-full"></div>
          </div>
        </>
      )}
    </Card>
  );
};

export default ExerciseCard;