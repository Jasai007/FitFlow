import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Dumbbell } from 'lucide-react';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  title
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <header className="sticky top-0 z-10 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center">
        <div className="flex-1 flex items-center">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="mr-2 p-2 rounded-full hover:bg-gray-100"
              aria-label="Go back"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          {location.pathname === '/' ? (
            <div className="flex items-center">
              <Dumbbell size={24} className="text-blue-600 mr-2" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                FitFlow
              </h1>
            </div>
          ) : (
            <h1 className="text-xl font-semibold">{title || ''}</h1>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;