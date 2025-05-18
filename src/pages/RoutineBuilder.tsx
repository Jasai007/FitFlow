import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import RoutineForm from '../components/routine/RoutineForm';
import ExerciseForm from '../components/exercise/ExerciseForm';
import Card from '../components/ui/Card';
import { useRoutines } from '../hooks/useRoutines';
import { Exercise } from '../types';
import { getTypeColor } from '../utils/helpers';
import { Plus, GripVertical, Trash, Save } from 'lucide-react';

const RoutineBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { routineId } = useParams<{ routineId: string }>();
  
  const {
    routines,
    createRoutine,
    updateRoutine,
    addExerciseToRoutine,
    updateExerciseInRoutine,
    removeExerciseFromRoutine,
    reorderExercises
  } = useRoutines();
  
  const [routine, setRoutine] = useState(routines.find(r => r.id === routineId));
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [draggedExercise, setDraggedExercise] = useState<string | null>(null);
  
  // Update routine when routines change
  useEffect(() => {
    if (routineId) {
      const found = routines.find(r => r.id === routineId);
      setRoutine(found);
    }
  }, [routines, routineId]);
  
  // Handle routine creation
  const handleCreateRoutine = (name: string, type: any, description?: string) => {
    const id = createRoutine(name, type, description);
    navigate(`/builder/${id}`);
  };
  
  // Handle exercise addition
  const handleAddExercise = (exercise: Omit<Exercise, 'id'>) => {
    if (routine) {
      addExerciseToRoutine(routine.id, exercise);
      setShowExerciseForm(false);
    }
  };
  
  // Handle exercise update
  const handleUpdateExercise = (exercise: Exercise) => {
    if (routine) {
      updateExerciseInRoutine(routine.id, exercise);
      setEditingExercise(null);
    }
  };
  
  // Handle drag start
  const handleDragStart = (exerciseId: string) => {
    setDraggedExercise(exerciseId);
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent, exerciseId: string) => {
    e.preventDefault();
    if (draggedExercise && draggedExercise !== exerciseId && routine) {
      const dragIndex = routine.exercises.findIndex(ex => ex.id === draggedExercise);
      const hoverIndex = routine.exercises.findIndex(ex => ex.id === exerciseId);
      
      if (dragIndex !== -1 && hoverIndex !== -1) {
        const newExercises = [...routine.exercises];
        const draggedItem = newExercises[dragIndex];
        newExercises.splice(dragIndex, 1);
        newExercises.splice(hoverIndex, 0, draggedItem);
        
        reorderExercises(routine.id, newExercises);
      }
    }
  };
  
  // Finish workout builder
  const handleFinish = () => {
    navigate('/routines');
  };
  
  // Creating a new routine
  if (!routineId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Create Routine" showBackButton />
        
        <div className="flex-1 p-4 pb-24">
          <h2 className="text-xl font-semibold mb-4">New Workout Routine</h2>
          
          <RoutineForm
            onSubmit={handleCreateRoutine}
            onCancel={() => navigate(-1)}
          />
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // Editing routine but not found
  if (!routine) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header title="Routine Not Found" showBackButton />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="mb-4">This routine doesn't exist or has been deleted.</p>
            <Button
              variant="primary"
              onClick={() => navigate('/routines')}
            >
              Back to Routines
            </Button>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // Add/Edit exercise form
  if (showExerciseForm || editingExercise) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header 
          title={editingExercise ? "Edit Exercise" : "Add Exercise"} 
          showBackButton 
        />
        
        <div className="flex-1 p-4 pb-24">
          <ExerciseForm
            initialValues={editingExercise || undefined}
            onSubmit={editingExercise 
              ? handleUpdateExercise 
              : handleAddExercise
            }
            onCancel={() => {
              setShowExerciseForm(false);
              setEditingExercise(null);
            }}
          />
        </div>
        
        <Footer />
      </div>
    );
  }
  
  // Editing routine
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Edit Routine" showBackButton />
      
      <div className="flex-1 p-4 pb-24">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1">{routine.name}</h2>
          <div className={`inline-block px-2 py-0.5 text-xs text-white rounded-full ${getTypeColor(routine.type)}`}>
            {routine.type}
          </div>
          {routine.description && (
            <p className="mt-2 text-gray-600">{routine.description}</p>
          )}
        </div>
        
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Exercises</h3>
          <span className="text-sm text-gray-600">
            {routine.exercises.length} exercises
          </span>
        </div>
        
        {/* Exercise list */}
        <div className="space-y-3 mb-6">
          {routine.exercises.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-4">No exercises added yet</p>
              <Button
                variant="primary"
                onClick={() => setShowExerciseForm(true)}
                icon={<Plus size={16} />}
              >
                Add Exercise
              </Button>
            </div>
          ) : (
            routine.exercises.map((exercise, index) => (
              <Card
                key={exercise.id}
                className="relative"
                draggable
                onDragStart={() => handleDragStart(exercise.id)}
                onDragOver={(e) => handleDragOver(e, exercise.id)}
              >
                <div className="absolute left-2 top-0 bottom-0 flex items-center cursor-move opacity-50 hover:opacity-100">
                  <GripVertical size={18} className="text-gray-400" />
                </div>
                
                <div className="ml-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{exercise.name}</h4>
                      <p className="text-sm text-gray-600">
                        {exercise.sets} sets × {exercise.reps} reps • {exercise.duration}s
                      </p>
                      {exercise.notes && (
                        <p className="text-xs text-gray-500 mt-1">{exercise.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex">
                      <Button
                        variant="ghost"
                        className="p-1 text-gray-500"
                        onClick={() => setEditingExercise(exercise)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        className="p-1 text-red-500"
                        onClick={() => removeExerciseFromRoutine(routine.id, exercise.id)}
                        icon={<Trash size={16} />}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
        
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => setShowExerciseForm(true)}
            icon={<Plus size={16} />}
          >
            Add Exercise
          </Button>
          
          <Button
            variant="primary"
            onClick={handleFinish}
            icon={<Save size={16} />}
          >
            Save Routine
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RoutineBuilder;