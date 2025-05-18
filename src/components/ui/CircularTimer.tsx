import React, { useEffect, useState } from 'react';

interface CircularTimerProps {
  duration: number; // in seconds
  elapsed: number;  // in seconds
  isRunning: boolean;
  size?: number;    // in pixels
  strokeWidth?: number;
  className?: string;
}

const CircularTimer: React.FC<CircularTimerProps> = ({
  duration,
  elapsed,
  isRunning,
  size = 80,
  strokeWidth = 6,
  className = ''
}) => {
  // Calculate percentage complete
  const progress = duration > 0 ? Math.min(elapsed / duration, 1) : 0;
  
  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference * (1 - progress);
  
  // Format time display
  const timeLeft = Math.max(0, duration - elapsed);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Determine color based on progress
  const getTimerColor = () => {
    if (progress >= 0.75) return 'stroke-red-500';
    if (progress >= 0.5) return 'stroke-orange-500';
    if (progress >= 0.25) return 'stroke-blue-500';
    return 'stroke-green-500';
  };
  
  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className={`transition-all duration-200 ${getTimerColor()}`}
        />
      </svg>
      
      {/* Time display */}
      <div className="absolute inset-0 flex items-center justify-center font-mono">
        <div className="text-center">
          <span className="text-sm font-semibold">
            {`${minutes}:${seconds.toString().padStart(2, '0')}`}
          </span>
        </div>
      </div>
      
      {/* Pulsing dot when running */}
      {isRunning && (
        <div className="absolute top-0 right-0 -mt-1 -mr-1">
          <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default CircularTimer;