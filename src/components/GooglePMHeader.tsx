
import React from 'react';
import { FileText, Award } from 'lucide-react';

export const GooglePMHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center mr-2">
              <span className="w-3 h-3 rounded-full bg-google-blue mr-1"></span>
              <span className="w-3 h-3 rounded-full bg-google-red mr-1"></span>
              <span className="w-3 h-3 rounded-full bg-google-yellow mr-1"></span>
              <span className="w-3 h-3 rounded-full bg-google-green"></span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ml-2 flex items-center">
              <FileText className="w-6 h-6 md:w-8 md:h-8 mr-2 text-google-blue" />
              Resume PM Whisperer
            </h1>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center text-sm text-gray-600">
              <Award className="w-4 h-4 mr-1 text-google-green" />
              <span>Powered by Google PM expertise</span>
            </div>
            <p className="text-xs text-gray-500">Optimize your resume for ATS success</p>
          </div>
        </div>
      </div>
    </header>
  );
};
