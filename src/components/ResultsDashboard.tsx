
import React, { useState } from 'react';
import { ResumeScanner } from '@/components/ResumeScanner';
import { KeywordAnalysis } from '@/components/KeywordAnalysis';
import { ScoreCircle } from '@/components/ScoreCircle';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast";
import { saveResumeAnalysis } from '@/services/googleSheets';
import { Loader2 } from 'lucide-react';

interface ResultsDashboardProps {
  atsScore: number;
  keywordScore: number;
  contentScore: number;
  overallScore: number;
  jobDescription: string;
  resumeFileName?: string;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  atsScore,
  keywordScore,
  contentScore,
  overallScore,
  jobDescription,
  resumeFileName = "resume.pdf",
  onReset
}) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRecommendations = async () => {
    setIsSaving(true);
    try {
      await saveResumeAnalysis({
        timestamp: new Date().toISOString(),
        fileName: resumeFileName,
        atsScore,
        keywordScore,
        contentScore,
        overallScore,
        jobTitle: extractJobTitle(jobDescription),
      });
      
      toast({
        title: "Data Saved to Google Sheets",
        description: "Your resume analysis has been successfully saved to Google Sheets."
      });
    } catch (error) {
      console.error('Error saving analysis:', error);
      toast({
        title: "Error Saving Data",
        description: "Failed to save your analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Extract job title from job description (simple implementation)
  const extractJobTitle = (description: string): string => {
    // Look for common job title patterns in the first few sentences
    const firstParagraph = description.split('\n')[0].trim();
    const jobTitleMatch = firstParagraph.match(/job title:?\s*([^.,:;]+)/i) || 
                          firstParagraph.match(/position:?\s*([^.,:;]+)/i) ||
                          firstParagraph.match(/^([^.,:;]{3,50})$/i);
    
    return jobTitleMatch ? jobTitleMatch[1].trim() : "Not specified";
  };

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
          onClick={handleSaveRecommendations}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save to Google Sheets"
          )}
        </Button>
      </div>
    </div>
  );
};
