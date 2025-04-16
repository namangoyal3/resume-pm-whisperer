
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
        
        {/* Brand Logos Section */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            <p className="text-xs text-gray-500 w-full text-center md:w-auto">Trusted by professionals from:</p>
            
            <div className="flex items-center justify-center space-x-8 flex-wrap">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-google-blue font-bold text-sm md:text-base">G</span>
                </div>
                <span className="text-xs mt-1 text-gray-600">Google</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-50 rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-sm md:text-base">A</span>
                </div>
                <span className="text-xs mt-1 text-gray-600">Amazon</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-bold text-sm md:text-base">M</span>
                </div>
                <span className="text-xs mt-1 text-gray-600">Meta</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-50 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-bold text-sm md:text-base">A</span>
                </div>
                <span className="text-xs mt-1 text-gray-600">Apple</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-red-50 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm md:text-base">N</span>
                </div>
                <span className="text-xs mt-1 text-gray-600">Netflix</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm md:text-base">MS</span>
                </div>
                <span className="text-xs mt-1 text-gray-600">Microsoft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
