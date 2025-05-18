import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Play, FolderPlus, Dumbbell } from 'lucide-react';
import Header from '../components/layout/Header';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 pb-20">
        <div className="mb-6">
          <Dumbbell size={64} className="mx-auto text-blue-600" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          FitFlow
        </h1>
        
        <p className="text-xl mb-8 max-w-md text-gray-600">
          Track your workouts, time your exercises, achieve your fitness goals
        </p>
        
        <div className="space-y-3 w-full max-w-xs">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate('/workout')}
            icon={<Play size={20} />}
          >
            Start Workout
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => navigate('/builder')}
            icon={<FolderPlus size={20} />}
          >
            Build Routine
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-8">Why FitFlow?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">Timed Workouts</h3>
              <p className="text-gray-600 text-center">
                Keep track of your exercise duration with our interactive timers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">Custom Routines</h3>
              <p className="text-gray-600 text-center">
                Create and save your personalized workout routines.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                  <path d="M12 20v-6M6 20V10M18 20V4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-center mb-2">Track Progress</h3>
              <p className="text-gray-600 text-center">
                Monitor your fitness journey with workout summaries.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Motivational Quote */}
      <section className="py-10 px-4 text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <blockquote className="text-xl italic max-w-2xl mx-auto">
          "The only bad workout is the one that didn't happen."
        </blockquote>
      </section>
    </div>
  );
};

export default LandingPage;