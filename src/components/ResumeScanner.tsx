
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RecommendationCard } from './RecommendationCard';
import { FileCheck, AlertTriangle, CheckCircle } from 'lucide-react';

interface ResumeScannerProps {
  atsScore: number;
}

export const ResumeScanner: React.FC<ResumeScannerProps> = ({ atsScore }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileCheck className="w-5 h-5 mr-2 text-google-red" />
          ATS Compatibility Scanner
        </CardTitle>
        <CardDescription>
          How well your resume works with Applicant Tracking Systems
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-green-50 rounded-md">
            <div className="flex items-center mb-1">
              <CheckCircle className="w-4 h-4 text-google-green mr-2" />
              <h3 className="font-medium text-sm">File Format</h3>
            </div>
            <p className="text-xs text-gray-600">Your resume is in an ATS-compatible format (PDF/DOCX).</p>
          </div>
          
          <div className={`p-3 ${atsScore > 80 ? 'bg-green-50' : 'bg-yellow-50'} rounded-md`}>
            <div className="flex items-center mb-1">
              {atsScore > 80 ? 
                <CheckCircle className="w-4 h-4 text-google-green mr-2" /> : 
                <AlertTriangle className="w-4 h-4 text-google-yellow mr-2" />
              }
              <h3 className="font-medium text-sm">Section Structure</h3>
            </div>
            <p className="text-xs text-gray-600">
              {atsScore > 80 ? 
                'Your resume uses clear standard section headers.' : 
                'Consider using standard section headers (Work Experience, Education, Skills).'
              }
            </p>
          </div>
        </div>
        
        <RecommendationCard
          icon={<AlertTriangle className="w-5 h-5 text-google-red" />}
          title="Complex Formatting"
          description="Your resume may contain formatting that confuses ATS systems."
          recommendation="Remove tables, complex columns, text boxes, headers/footers, and graphics. Use simple bullet points instead."
          score={atsScore < 70 ? "High" : atsScore < 85 ? "Medium" : "Low"}
        />
        
        <RecommendationCard
          icon={<AlertTriangle className="w-5 h-5 text-google-yellow" />}
          title="Font Selection"
          description="Some fonts can cause issues with ATS parsing."
          recommendation="Use standard fonts like Arial, Calibri, or Times New Roman. Avoid decorative or uncommon fonts."
          score={atsScore < 75 ? "High" : "Medium"}
        />
        
        {atsScore < 85 && (
          <RecommendationCard
            icon={<AlertTriangle className="w-5 h-5 text-google-yellow" />}
            title="Contact Information"
            description="Ensure your contact information is easily parsable by ATS."
            recommendation="Place contact information in the top section of your resume, not in headers or footers which may be ignored by ATS systems."
            score="Medium"
          />
        )}
      </CardContent>
    </Card>
  );
};
