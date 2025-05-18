import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import RoutineCard from '../components/routine/RoutineCard';
import { useRoutines } from '../hooks/useRoutines';
import { ExerciseType } from '../types';
import { PlusCircle } from 'lucide-react';

const RoutineLibrary: React.FC = () => {
  const navigate = useNavigate();
  const { routines, removeRoutine } = useRoutines();
  
  const [selectedType, setSelectedType] = useState<ExerciseType | 'all'>('all');
  
  // Filter routines based on selected type
  const filteredRoutines = selectedType === 'all'
    ? routines
    : routines.filter(routine => routine.type === selectedType);
  
  // Handle starting a routine
  const handleStartRoutine = (routineId: string) => {
    navigate(`/workout`, { state: { routineId } });
  };
  
  // Handle editing a routine
  const handleEditRoutine = (routineId: string) => {
    navigate(`/builder/${routineId}`);
  };
  
  // Handle duplicating a routine
  const handleDuplicateRoutine = (routineId: string) => {
    // This would duplicate the routine in a real app
    // For this demo, we'll just navigate to the routine
    navigate(`/builder/${routineId}`);
  };
  
  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'strength', label: 'Strength' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'hiit', label: 'HIIT' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'balance', label: 'Balance' }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="My Routines" />
      
      <div className="p-4 pb-24 flex-1">
        {/* Filter tabs */}
        <div className="mb-4 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {filterOptions.map(option => (
              <button
                key={option.value}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                  selectedType === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedType(option.value as ExerciseType | 'all')}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Create routine button */}
        <div className="mb-4">
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/builder')}
            icon={<PlusCircle size={18} />}
          >
            Create New Routine
          </Button>
        </div>
        
        {/* Routines grid */}
        {filteredRoutines.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              {selectedType === 'all'
                ? 'No routines found. Create your first workout routine!'
                : `No ${selectedType} routines found.`}
            </p>
            {selectedType === 'all' && (
              <Button
                variant="primary"
                onClick={() => navigate('/builder')}
              >
                Create Routine
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRoutines.map(routine => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onStart={() => handleStartRoutine(routine.id)}
                onEdit={() => handleEditRoutine(routine.id)}
                onDuplicate={() => handleDuplicateRoutine(routine.id)}
                onDelete={() => removeRoutine(routine.id)}
              />
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default RoutineLibrary;