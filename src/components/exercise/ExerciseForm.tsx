import React, { useState } from 'react';
import { Exercise, ExerciseType } from '../../types';
import Button from '../ui/Button';
import { generateId, getExerciseTypeOptions } from '../../utils/helpers';

interface ExerciseFormProps {
  onSubmit: (exercise: Omit<Exercise, 'id'> | Exercise) => void;
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
  const [mode, setMode] = useState<'reps' | 'time'>(initialValues?.duration && initialValues.duration > 0 ? 'time' : 'reps');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const exerciseData: any = {
      name: name.trim(),
      sets: Math.max(1, sets),
      type,
      notes: notes.trim()
    };
    if (mode === 'reps') {
      exerciseData.reps = Math.max(1, reps);
      exerciseData.duration = 0;
    } else {
      exerciseData.duration = Math.max(5, duration);
      exerciseData.reps = 0;
    }
    if (initialValues?.id) {
      onSubmit({ ...exerciseData, id: initialValues.id });
    } else {
      onSubmit(exerciseData);
    }
    if (!initialValues) {
      setName('');
      setSets(3);
      setReps(10);
      setDuration(60);
      setType('strength');
      setNotes('');
      setMode('reps');
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
      
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Mode</label>
        <div className="flex space-x-2">
          <button
            type="button"
            className={`px-3 py-1 rounded-full border ${mode === 'reps' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} border-blue-600`}
            onClick={() => setMode('reps')}
          >
            Reps-based
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded-full border ${mode === 'time' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'} border-blue-600`}
            onClick={() => setMode('time')}
          >
            Time-based
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {mode === 'reps' && (
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
        )}
        {mode === 'reps' ? (
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
        ) : (
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (seconds)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
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