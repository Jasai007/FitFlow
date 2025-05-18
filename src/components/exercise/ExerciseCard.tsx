import React from 'react';
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
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isCompleted,
  onComplete,
  className = ''
}) => {
  const {
    elapsed,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer
  } = useTimer({
    duration: exercise.duration,
    onComplete: onComplete
  });
  
  return (
    <Card 
      className={`${className} transition-all duration-300 ${isCompleted ? 'opacity-70' : 'opacity-100'}`}
    >
      <div className="flex items-start">
        {/* Exercise info */}
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold">{exercise.name}</h3>
            <div className={`ml-2 px-2 py-0.5 text-xs text-white rounded-full ${getTypeColor(exercise.type)}`}>
              {exercise.type}
            </div>
          </div>
          
          <div className="mt-2 text-gray-700">
            <p className="text-sm">{exercise.sets} sets × {exercise.reps} reps</p>
            {exercise.notes && <p className="text-xs mt-1 text-gray-500">{exercise.notes}</p>}
          </div>
        </div>
        
        {/* Timer section */}
        <div className="flex flex-col items-center">
          <CircularTimer
            duration={exercise.duration}
            elapsed={elapsed}
            isRunning={isRunning}
            size={70}
          />
          
          <div className="mt-2 flex space-x-1">
            {!isCompleted ? (
              <>
                {isRunning ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={pauseTimer}
                    icon={<Pause size={16} />}
                    className="p-1"
                  />
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={startTimer}
                    icon={<Play size={16} />}
                    className="p-1"
                  />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetTimer}
                  icon={<RotateCcw size={16} />}
                  className="p-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onComplete}
                  icon={<Check size={16} />}
                  className="p-1 text-green-600"
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-8 w-8 bg-green-100 text-green-600 rounded-full">
                <Check size={16} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Progress indicator */}
      {isCompleted && (
        <div className="mt-2 w-full bg-green-100 h-1 rounded-full">
          <div className="bg-green-500 h-1 rounded-full w-full"></div>
        </div>
      )}
    </Card>
  );
};

export default ExerciseCard;