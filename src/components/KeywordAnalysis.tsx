
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecommendationCard } from './RecommendationCard';
import { Search, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface KeywordAnalysisProps {
  keywordScore: number;
  jobDescription: string;
}

export const KeywordAnalysis: React.FC<KeywordAnalysisProps> = ({ keywordScore, jobDescription }) => {
  // Simulate keyword extraction from job description
  const extractKeywords = (text: string) => {
    const commonKeywords = [
      'product management', 'user experience', 'stakeholder management', 
      'agile', 'scrum', 'roadmap', 'KPIs', 'data analysis', 'A/B testing',
      'product strategy', 'user research', 'customer journey', 'MVP',
      'sprint planning', 'prioritization', 'requirements gathering'
    ];
    
    // Return random selection of keywords based on the job description length
    const count = Math.min(Math.floor(text.length / 100) + 3, commonKeywords.length);
    return commonKeywords.sort(() => 0.5 - Math.random()).slice(0, count);
  };
  
  const missingKeywords = [
    'user stories', 'competitive analysis', 'product metrics', 'go-to-market strategy'
  ];
  
  const matchedKeywords = extractKeywords(jobDescription);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Search className="w-5 h-5 mr-2 text-google-yellow" />
          Keyword Optimization
        </CardTitle>
        <CardDescription>
          How well your resume matches the job description keywords
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center">
            <CheckCircle className="w-4 h-4 mr-1 text-google-green" />
            Matched Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center">
            <XCircle className="w-4 h-4 mr-1 text-google-red" />
            Missing Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
        
        <RecommendationCard
          icon={<AlertTriangle className="w-5 h-5 text-google-yellow" />}
          title="Keyword Integration"
          description="Your resume is missing several key terms from the job description."
          recommendation="Add the missing keywords naturally within your experience section. For example, include 'product metrics' when discussing how you measured success."
          score={keywordScore < 70 ? "Low" : keywordScore < 85 ? "Medium" : "High"}
        />
        
        <RecommendationCard
          icon={<AlertTriangle className="w-5 h-5 text-google-yellow" />}
          title="Terminology Consistency"
          description="Use both acronyms and full terms to maximize ATS matching."
          recommendation="Include both formats: 'Key Performance Indicators (KPIs)' and 'User Experience (UX)' to ensure matching regardless of how the ATS searches."
          score="Medium"
        />
      </CardContent>
    </Card>
  );
};
