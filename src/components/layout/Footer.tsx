import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Dumbbell, FolderPlus, List } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Home' },
    { path: '/workout', icon: <Dumbbell size={20} />, label: 'Workout' },
    { path: '/builder', icon: <FolderPlus size={20} />, label: 'Builder' },
    { path: '/routines', icon: <List size={20} />, label: 'Routines' }
  ];
  
  return (
    <footer className="fixed bottom-0 w-full bg-white border-t shadow-lg z-10">
      <nav className="container mx-auto px-4">
        <ul className="flex justify-around">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-3 px-4 transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label={item.label}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;