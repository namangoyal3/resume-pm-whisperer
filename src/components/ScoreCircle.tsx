
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ScoreCircleProps {
  score: number;
  title: string;
  description: string;
  mainColor: string;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({
  score,
  title,
  description,
  mainColor
}) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    // Animate the score counting up
    const timer = setTimeout(() => {
      setDisplayScore(score);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [score]);
  
  // Calculate the stroke dash offset for the circle
  const circumference = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  
  // Determine color based on score
  const getScoreColorClass = () => {
    if (score >= 85) return 'text-google-green';
    if (score >= 70) return 'text-google-yellow';
    return 'text-google-red';
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
        <div className="relative w-32 h-32 mb-2">
          {/* Background circle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="8"
            />
            
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={mainColor.replace('bg-', 'text-')}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ 
                transition: 'stroke-dashoffset 1s ease-in-out',
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%'
              }}
              className={mainColor.replace('bg-', 'stroke-')}
            />
          </svg>
          
          {/* Score text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColorClass()}`}>
              {Math.round(displayScore)}
            </span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mt-2">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};
