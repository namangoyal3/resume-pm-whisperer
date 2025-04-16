
import React, { useState } from 'react';
import { ResumeScanner } from '@/components/ResumeScanner';
import { KeywordAnalysis } from '@/components/KeywordAnalysis';
import { ScoreCircle } from '@/components/ScoreCircle';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast";
import { saveResumeAnalysis } from '@/services/googleSheets';
import { Loader2, Download, Calendar, User, Star, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsDashboardProps {
  atsScore: number;
  keywordScore: number;
  contentScore: number;
  overallScore: number;
  jobDescription: string;
  resumeFileName?: string;
  onReset: () => void;
  expertName: string;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  atsScore,
  keywordScore,
  contentScore,
  overallScore,
  jobDescription,
  resumeFileName = "resume.pdf",
  onReset,
  expertName
}) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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

  const expertizeAreas = [
    "Resume Structure", "ATS Optimization", "Keyword Implementation", 
    "Work Experience", "Skills Section", "Education Section", 
    "Achievements", "Professional Summary"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-4">
        <h1 className="text-3xl font-bold mb-3">Your Expert Resume Analysis</h1>
        <p className="text-gray-600">
          Personalized feedback from {expertName}, FAANG Product Manager with 15+ years of experience
        </p>
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Star className="h-5 w-5 fill-google-yellow text-google-yellow" />
          <Star className="h-5 w-5 fill-google-yellow text-google-yellow" />
          <Star className="h-5 w-5 fill-google-yellow text-google-yellow" />
          <Star className="h-5 w-5 fill-google-yellow text-google-yellow" />
          <Star className="h-5 w-5 fill-google-yellow text-google-yellow" />
        </div>
      </div>
      
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="next-steps">Next Steps</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Before vs After Potential</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current ATS Score</span>
                    <span className="font-medium">{atsScore}%</span>
                  </div>
                  <Progress value={atsScore} className="h-3" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Potential ATS Score with Improvements</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-3 bg-gray-200">
                    <div className="h-full bg-google-green rounded-full" style={{ width: '95%' }}></div>
                  </Progress>
                </div>
                
                <div className="bg-green-50 p-4 rounded-md border border-green-100">
                  <h4 className="font-medium mb-1">Expert Insight</h4>
                  <p className="text-sm text-gray-600">
                    Implementing our recommendations can significantly increase your resume's performance with ATS systems, leading to a higher likelihood of securing interviews.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Expert Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {expertizeAreas.map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border-b">
                      <span>{area}</span>
                      <Badge className={
                        index % 3 === 0 ? "bg-red-100 text-red-800" :
                        index % 3 === 1 ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }>
                        {index % 3 === 0 ? "Major Changes" :
                         index % 3 === 1 ? "Minor Changes" :
                         "Good"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <ResumeScanner atsScore={atsScore} />
          <KeywordAnalysis keywordScore={keywordScore} jobDescription={jobDescription} />
        </TabsContent>
        
        <TabsContent value="detailed" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-md border border-yellow-100 space-y-2">
                  <h4 className="font-medium">Current Summary</h4>
                  <p className="text-sm text-gray-600 italic">
                    "Experienced product manager with a track record of delivering successful products."
                  </p>
                  <Badge className="bg-yellow-100 text-yellow-800">Needs Improvement</Badge>
                </div>
                
                <div className="p-4 bg-green-50 rounded-md border border-green-100 space-y-2">
                  <h4 className="font-medium">Recommended Summary</h4>
                  <p className="text-sm text-gray-600 italic">
                    "Results-driven product manager with over 5 years of experience driving 20%+ revenue growth through strategic feature prioritization and cross-functional team leadership at fast-paced tech companies. Passionate about using data-driven insights to deliver exceptional user experiences that solve real customer problems."
                  </p>
                  <Badge className="bg-green-100 text-green-800">Expert Suggestion</Badge>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="font-medium mb-1">Expert Commentary</h4>
                  <p className="text-sm text-gray-600">
                    Your current summary is too generic and doesn't highlight your unique value proposition. The recommended version includes specific achievements (20%+ revenue growth), key skills (strategic prioritization, team leadership), and your passion/motivation. This will immediately grab the hiring manager's attention.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-md border border-yellow-100 space-y-2">
                  <h4 className="font-medium">Current Format</h4>
                  <p className="text-sm text-gray-600 italic">
                    • Managed the product development process<br />
                    • Worked with engineering and design teams<br />
                    • Conducted market research and analysis
                  </p>
                  <Badge className="bg-yellow-100 text-yellow-800">Needs Improvement</Badge>
                </div>
                
                <div className="p-4 bg-green-50 rounded-md border border-green-100 space-y-2">
                  <h4 className="font-medium">Recommended Format</h4>
                  <p className="text-sm text-gray-600 italic">
                    • Led end-to-end product development for mobile payment feature that increased user engagement by 34% and reduced checkout abandonment by 27%<br />
                    • Orchestrated cross-functional collaboration between engineering, design, and marketing teams, reducing time-to-market by 20% compared to previous product launches<br />
                    • Conducted comprehensive market analysis that identified 3 untapped customer segments, informing product roadmap and contributing to $2.5M ARR
                  </p>
                  <Badge className="bg-green-100 text-green-800">Expert Suggestion</Badge>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="font-medium mb-1">Expert Commentary</h4>
                  <p className="text-sm text-gray-600">
                    Your current bullet points describe responsibilities rather than achievements. Transform each point to follow the formula: Action + Metric + Result. Quantify your impact with specific numbers and percentages. This approach clearly demonstrates your value and makes your contributions tangible to hiring managers.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skills Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-md border border-yellow-100 space-y-2">
                  <h4 className="font-medium">Current Format</h4>
                  <p className="text-sm text-gray-600 italic">
                    Skills: Agile, Product Management, Leadership, Communication
                  </p>
                  <Badge className="bg-yellow-100 text-yellow-800">Needs Improvement</Badge>
                </div>
                
                <div className="p-4 bg-green-50 rounded-md border border-green-100 space-y-2">
                  <h4 className="font-medium">Recommended Format</h4>
                  <p className="text-sm text-gray-600 italic">
                    <strong>Technical Skills:</strong> Agile/Scrum, Product Roadmapping, A/B Testing, SQL, Product Analytics (Amplitude, Mixpanel), JIRA, Figma<br />
                    <strong>Business Skills:</strong> Revenue Forecasting, Market Research, Competitive Analysis, User Persona Development, Go-to-Market Strategy<br />
                    <strong>Leadership:</strong> Cross-functional Team Leadership, Stakeholder Management, Strategic Planning, Mentoring
                  </p>
                  <Badge className="bg-green-100 text-green-800">Expert Suggestion</Badge>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="font-medium mb-1">Expert Commentary</h4>
                  <p className="text-sm text-gray-600">
                    Your skills section should be organized into categories for better readability and ATS optimization. Include specific tools and methodologies that match the job description. This structured format helps both the ATS and human reviewers quickly identify your relevant qualifications.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="next-steps" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2 text-google-blue" />
                  Download Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-between">
                  Complete Expert Analysis PDF
                  <Download className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="w-full justify-between">
                  ATS-Optimized Resume Template
                  <Download className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" className="w-full justify-between">
                  PM Interview Preparation Guide
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-google-blue" />
                  Expert Consultation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-md border border-blue-100 space-y-3">
                  <h4 className="font-medium">Book a 1:1 Session with {expertName}</h4>
                  <p className="text-sm text-gray-600">
                    Get personalized career guidance and in-depth resume feedback in a private 60-minute session.
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-google-blue" />
                    <span className="text-sm font-medium">Limited spots available this month</span>
                  </div>
                  
                  <Button className="w-full mt-2">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                  <h4 className="font-medium mb-2">Premium Services</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-google-blue mr-2">•</span>
                      Resume rewriting by FAANG experts
                    </li>
                    <li className="flex items-start">
                      <span className="text-google-blue mr-2">•</span>
                      Mock interview preparation
                    </li>
                    <li className="flex items-start">
                      <span className="text-google-blue mr-2">•</span>
                      Salary negotiation coaching
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Resume Improvement Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-google-blue flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <h3 className="text-lg font-medium">Implement ATS Optimization</h3>
                    <p className="text-gray-600 mt-1">
                      Update your formatting and structure to ensure ATS compatibility. Focus on removing complex tables, headers/footers, and using standard section titles.
                    </p>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-google-blue flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <h3 className="text-lg font-medium">Enhance Content Quality</h3>
                    <p className="text-gray-600 mt-1">
                      Rewrite your bullet points to focus on achievements and results rather than responsibilities. Quantify your impact with specific metrics where possible.
                    </p>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-google-blue flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <h3 className="text-lg font-medium">Targeted Keyword Optimization</h3>
                    <p className="text-gray-600 mt-1">
                      Integrate the missing keywords we've identified naturally throughout your resume, especially in your summary, skills section, and work experience.
                    </p>
                  </div>
                  
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-google-blue flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <h3 className="text-lg font-medium">Expert Review</h3>
                    <p className="text-gray-600 mt-1">
                      After implementing these changes, consider booking a 1:1 session for final polishing and personalized strategies to target your specific dream companies.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
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
