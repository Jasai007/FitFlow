import React, { useState } from 'react';
import { Exercise, ExerciseType } from '../../types';
import Button from '../ui/Button';
import { generateId, getExerciseTypeOptions } from '../../utils/helpers';

interface ExerciseFormProps {
  onSubmit: (exercise: Omit<Exercise, 'id'>) => void;
  initialValues?: Exercise;
  onCancel?: () => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  onSubmit,
  initialValues,
  onCancel
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [sets, setSets] = useState(initialValues?.sets || 3);
  const [reps, setReps] = useState(initialValues?.reps || 10);
  const [duration, setDuration] = useState(initialValues?.duration || 60);
  const [type, setType] = useState<ExerciseType>(initialValues?.type || 'strength');
  const [notes, setNotes] = useState(initialValues?.notes || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name.trim()) return;
    
    onSubmit({
      name: name.trim(),
      sets: Math.max(1, sets),
      reps: Math.max(1, reps),
      duration: Math.max(5, duration),
      type,
      notes: notes.trim()
    });
    
    // Reset form if not editing
    if (!initialValues) {
      setName('');
      setSets(3);
      setReps(10);
      setDuration(60);
      setType('strength');
      setNotes('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Exercise Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Push-ups"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sets" className="block text-sm font-medium text-gray-700 mb-1">
            Sets
          </label>
          <input
            type="number"
            id="sets"
            min="1"
            value={sets}
            onChange={(e) => setSets(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-1">
            Reps
          </label>
          <input
            type="number"
            id="reps"
            min="1"
            value={reps}
            onChange={(e) => setReps(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          Duration (seconds)
        </label>
        <input
          type="number"
          id="duration"
          min="5"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value) || 5)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Exercise Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as ExerciseType)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {getExerciseTypeOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={2}
          placeholder="Any tips or reminders"
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        
        <Button
          type="submit"
          variant="primary"
        >
          {initialValues ? 'Update Exercise' : 'Add Exercise'}
        </Button>
      </div>
    </form>
  );
};

export default ExerciseForm;