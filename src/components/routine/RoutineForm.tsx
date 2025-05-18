import React, { useState } from 'react';
import { ExerciseType } from '../../types';
import Button from '../ui/Button';
import { getExerciseTypeOptions } from '../../utils/helpers';

interface RoutineFormProps {
  onSubmit: (name: string, type: ExerciseType, description?: string) => void;
  initialValues?: {
    name: string;
    type: ExerciseType;
    description?: string;
  };
  onCancel?: () => void;
}

const RoutineForm: React.FC<RoutineFormProps> = ({
  onSubmit,
  initialValues,
  onCancel
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [type, setType] = useState<ExerciseType>(initialValues?.type || 'strength');
  const [description, setDescription] = useState(initialValues?.description || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name.trim()) return;
    
    onSubmit(
      name.trim(),
      type,
      description.trim() || undefined
    );
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Routine Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., Morning Workout"
          required
        />
      </div>
      
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          Routine Type
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
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          placeholder="Describe your routine"
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
          {initialValues ? 'Update Routine' : 'Create Routine'}
        </Button>
      </div>
    </form>
  );
};

export default RoutineForm;