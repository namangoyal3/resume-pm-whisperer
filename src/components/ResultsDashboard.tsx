
import React from 'react';
import { ResumeScanner } from '@/components/ResumeScanner';
import { KeywordAnalysis } from '@/components/KeywordAnalysis';
import { ScoreCircle } from '@/components/ScoreCircle';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast";

interface ResultsDashboardProps {
  atsScore: number;
  keywordScore: number;
  contentScore: number;
  overallScore: number;
  jobDescription: string;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  atsScore,
  keywordScore,
  contentScore,
  overallScore,
  jobDescription,
  onReset
}) => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
      
      <Separator />
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Detailed Analysis & Recommendations</h2>
        <ResumeScanner atsScore={atsScore} />
        <KeywordAnalysis keywordScore={keywordScore} jobDescription={jobDescription} />
      </div>
      
      <div className="flex justify-center mt-8">
        <Button 
          onClick={onReset}
          variant="outline" 
          className="mr-4"
        >
          Upload New Resume
        </Button>
        <Button 
          className="bg-google-blue hover:bg-blue-600"
          onClick={() => {
            toast({
              title: "Recommendations Saved",
              description: "Your recommendations have been saved successfully."
            });
          }}
        >
          Save Recommendations
        </Button>
      </div>
    </div>
  );
};
