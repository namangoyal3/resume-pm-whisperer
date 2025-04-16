
import React from 'react';
import { FileText, Award, CheckCircle, Star, Users } from 'lucide-react';

export const GooglePMHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-6 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center relative">
              <div className="flex items-center mr-2">
                <span className="w-3 h-3 rounded-full bg-google-blue mr-1 animate-pulse"></span>
                <span className="w-3 h-3 rounded-full bg-google-red mr-1"></span>
                <span className="w-3 h-3 rounded-full bg-google-yellow mr-1"></span>
                <span className="w-3 h-3 rounded-full bg-google-green"></span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ml-2 flex items-center">
                <FileText className="w-6 h-6 md:w-8 md:h-8 mr-2 text-google-blue" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-google-blue to-google-green">
                  Resume PM Whisperer
                </span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-1 text-google-green" />
                <span>ATS Optimization</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 mr-1 text-google-yellow" />
                <span>Expert Reviews</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1 text-google-blue" />
                <span>FAANG Expertise</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center text-sm font-medium text-google-blue">
                <Award className="w-4 h-4 mr-1 text-google-green" />
                <span>3X More Interviews</span>
              </div>
              <p className="text-xs text-gray-500">Resume optimization for PM roles</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
