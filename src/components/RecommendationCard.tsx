
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface RecommendationCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  recommendation: string;
  score: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  icon,
  title,
  description,
  recommendation,
  score
}) => {
  const getScoreBadgeColor = () => {
    switch (score.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="p-4 rounded-md border border-gray-200 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {icon}
          <h3 className="font-medium ml-2">{title}</h3>
        </div>
        <Badge variant="outline" className={getScoreBadgeColor()}>
          {score} Priority
        </Badge>
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      
      <div className="bg-gray-50 p-3 rounded-md border-l-4 border-google-blue">
        <p className="text-sm">
          <span className="font-medium">Recommendation:</span> {recommendation}
        </p>
      </div>
    </div>
  );
};
