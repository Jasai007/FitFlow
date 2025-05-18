import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import WorkoutDashboard from './pages/WorkoutDashboard';
import RoutineBuilder from './pages/RoutineBuilder';
import RoutineLibrary from './pages/RoutineLibrary';
import WorkoutSummary from './pages/WorkoutSummary';

// Components
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/workout" element={<WorkoutDashboard />} />
          <Route path="/builder" element={<RoutineBuilder />} />
          <Route path="/builder/:routineId" element={<RoutineBuilder />} />
          <Route path="/routines" element={<RoutineLibrary />} />
          <Route path="/summary" element={<WorkoutSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;