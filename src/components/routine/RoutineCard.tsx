import React from 'react';
import { Routine } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Play, Pencil, Copy, Trash } from 'lucide-react';
import { getTypeColor } from '../../utils/helpers';

interface RoutineCardProps {
  routine: Routine;
  onStart: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const RoutineCard: React.FC<RoutineCardProps> = ({
  routine,
  onStart,
  onEdit,
  onDuplicate,
  onDelete
}) => {
  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  // Calculate total workout duration
  const totalDuration = routine.exercises.reduce(
    (total, exercise) => total + exercise.duration * exercise.sets, 
    0
  );
  
  // Format duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };
  
  return (
    <Card className="h-full flex flex-col" hoverable>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{routine.name}</h3>
            <div className={`mt-1 inline-block px-2 py-0.5 text-xs text-white rounded-full ${getTypeColor(routine.type)}`}>
              {routine.type}
            </div>
          </div>
          
          <div className="text-right text-xs text-gray-500">
            Created {formatDate(routine.createdAt)}
          </div>
        </div>
        
        {routine.description && (
          <p className="mt-2 text-sm text-gray-600">{routine.description}</p>
        )}
        
        <div className="mt-3 flex items-center text-sm text-gray-600">
          <span className="font-medium">{routine.exercises.length} exercises</span>
          <span className="mx-2">•</span>
          <span>{formatDuration(totalDuration)}</span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button 
          variant="primary" 
          onClick={onStart}
          icon={<Play size={16} />}
          fullWidth
        >
          Start
        </Button>
        
        <div className="flex space-x-1">
          <Button
            variant="outline"
            onClick={onEdit}
            icon={<Pencil size={16} />}
            className="flex-1"
          >
            Edit
          </Button>
          
          <Button
            variant="ghost"
            onClick={onDuplicate}
            className="p-2"
            icon={<Copy size={16} />}
          />
          
          <Button
            variant="ghost"
            onClick={onDelete}
            className="p-2 text-red-500 hover:text-red-700"
            icon={<Trash size={16} />}
          />
        </div>
      </div>
    </Card>
  );
};

export default RoutineCard;