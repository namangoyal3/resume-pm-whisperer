
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreCircle } from '@/components/ScoreCircle';
import { Progress } from "@/components/ui/progress";
import { Lock, AlertTriangle, CheckCircle, ArrowRight, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface LimitedPreviewProps {
  atsScore: number;
  keywordScore: number;
  contentScore: number;
  overallScore: number;
  expertName: string;
  onUnlock: () => void;
}

export const LimitedPreview: React.FC<LimitedPreviewProps> = ({
  atsScore,
  keywordScore,
  contentScore,
  overallScore,
  expertName,
  onUnlock
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-6">
        <h1 className="text-3xl font-bold mb-3">Initial Resume Analysis</h1>
        <p className="text-gray-600">
          Here's a preview of your resume analysis. Complete your profile to unlock the full expert feedback.
        </p>
        <div className="mt-4 flex items-center justify-center space-x-2 text-gray-500 text-sm">
          <User className="h-4 w-4" />
          <span>Analysis by <span className="font-medium text-google-blue">{expertName}</span></span>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-black bg-opacity-40 backdrop-blur-sm p-8 rounded-xl flex flex-col items-center shadow-xl">
            <Lock className="h-12 w-12 text-white mb-4" />
            <h2 className="text-white text-2xl font-bold mb-2">Unlock Full Analysis</h2>
            <p className="text-gray-200 text-center max-w-md mb-6">
              Complete your profile to unlock detailed expert feedback and recommendations.
            </p>
            <Button 
              onClick={onUnlock}
              className="px-6 py-2 bg-white text-google-blue hover:bg-gray-100 pointer-events-auto"
            >
              Complete Profile
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="filter blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <ScoreCircle 
              score={overallScore} 
              title="Overall Score" 
              description="Combined performance score" 
              mainColor="bg-google-blue"
            />
            <ScoreCircle 
              score={atsScore} 
              title="ATS Compatibility" 
              description="How well your resume works with ATS" 
              mainColor="bg-google-red"
            />
            <ScoreCircle 
              score={keywordScore} 
              title="Keyword Match" 
              description="Keyword alignment with job description" 
              mainColor="bg-google-yellow"
            />
            <ScoreCircle 
              score={contentScore} 
              title="Content Quality" 
              description="Overall resume content effectiveness" 
              mainColor="bg-google-green"
            />
          </div>
          
          <Separator className="my-8" />
          
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Key Improvement Areas</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">ATS Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Format Compatibility</span>
                  <span>{atsScore > 80 ? 'Good' : 'Needs Improvement'}</span>
                </div>
                <Progress value={atsScore} className="h-2" />
                
                <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-google-yellow mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Complex Formatting Detected</h4>
                      <p className="text-sm text-gray-600">Your resume may contain formatting that confuses ATS systems...</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Keyword Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Keyword Match</span>
                  <span>{keywordScore > 75 ? 'Good' : 'Needs Improvement'}</span>
                </div>
                <Progress value={keywordScore} className="h-2" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-md border border-green-100">
                    <h4 className="font-medium flex items-center">
                      <CheckCircle className="h-4 w-4 text-google-green mr-2" />
                      Matched Keywords
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">Strategic planning, leadership...</p>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-md border border-red-100">
                    <h4 className="font-medium flex items-center">
                      <AlertTriangle className="h-4 w-4 text-google-red mr-2" />
                      Missing Keywords
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">User research, competitive analysis...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Content Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Content Effectiveness</span>
                  <span>{contentScore > 75 ? 'Good' : 'Needs Improvement'}</span>
                </div>
                <Progress value={contentScore} className="h-2" />
                
                <div className="p-4 bg-yellow-50 rounded-md border border-yellow-100">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-google-yellow mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Achievement Focus</h4>
                      <p className="text-sm text-gray-600">Your resume lists responsibilities but lacks measurable achievements...</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-10">
        <Button 
          onClick={onUnlock}
          className="px-8 py-6 text-lg bg-google-blue hover:bg-blue-600"
        >
          Complete Profile to Unlock Full Analysis
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
