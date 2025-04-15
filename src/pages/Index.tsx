import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { FileUploader } from '@/components/FileUploader';
import { ResumeScanner } from '@/components/ResumeScanner';
import { KeywordAnalysis } from '@/components/KeywordAnalysis';
import { GooglePMHeader } from '@/components/GooglePMHeader';
import { ScoreCircle } from '@/components/ScoreCircle';
import { analyzeResume } from '@/services/uploadService';
import { Separator } from '@/components/ui/separator';
import { FileText, Upload, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { RecommendationCard } from '@/components/RecommendationCard';

const Index = () => {
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  
  const [atsScore, setAtsScore] = useState(0);
  const [keywordScore, setKeywordScore] = useState(0);
  const [contentScore, setContentScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);

  const handleAnalyzeResume = async () => {
    if (!resumeFile) {
      toast({
        title: "Missing Resume",
        description: "Please upload your resume before analyzing.",
        variant: "destructive",
      });
      return;
    }
    
    if (!jobDescription.trim()) {
      toast({
        title: "Missing Job Description",
        description: "Please enter the job description for best results.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeResume(resumeFile, jobDescription);
      
      setAtsScore(result.atsScore);
      setKeywordScore(result.keywordScore);
      setContentScore(result.contentScore);
      setOverallScore(result.overallScore);
      setActiveTab('results');
      
      toast({
        title: "Analysis Complete",
        description: "Review your detailed results in the dashboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatFilename = (name: string) => {
    if (name.length > 25) {
      return name.substring(0, 22) + '...';
    }
    return name;
  };

  const handleFileUpload = (file: File) => {
    setResumeFile(file);
    toast({
      title: "Resume Uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <GooglePMHeader />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" disabled={isAnalyzing}>
              <Upload className="w-4 h-4 mr-2" />
              Upload & Analyze
            </TabsTrigger>
            <TabsTrigger value="results" disabled={atsScore === 0}>
              <FileText className="w-4 h-4 mr-2" />
              Results & Recommendations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-google-blue" />
                    Resume Upload
                  </CardTitle>
                  <CardDescription>
                    Upload your resume in PDF or DOCX format
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploader onFileUpload={handleFileUpload} isUploading={isAnalyzing} />
                  
                  {resumeFile && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md flex items-center">
                      <CheckCircle className="w-5 h-5 text-google-green mr-2" />
                      <span className="text-sm">{formatFilename(resumeFile.name)}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-google-blue" />
                    Job Description
                  </CardTitle>
                  <CardDescription>
                    Paste the job description for keyword analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Paste the full job description here..."
                    className="min-h-[200px]"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleAnalyzeResume} 
                disabled={isAnalyzing || !resumeFile}
                className="px-8 py-6 text-lg bg-google-blue hover:bg-blue-600"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            {atsScore > 0 && (
              <>
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
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Info className="w-5 h-5 mr-2 text-google-green" />
                        Content Quality Assessment
                      </CardTitle>
                      <CardDescription>
                        How effective is your resume content for recruiters?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RecommendationCard
                        icon={<AlertTriangle className="w-5 h-5 text-google-yellow" />}
                        title="Achievement Quantification"
                        description="Your resume needs more quantified achievements. Add metrics, percentages, and specific outcomes."
                        recommendation="Convert statements like 'Improved team productivity' to 'Increased team productivity by 27% over 6 months, resulting in $120K cost savings'."
                        score={contentScore < 70 ? "Low" : contentScore < 85 ? "Medium" : "High"}
                      />
                      
                      <RecommendationCard
                        icon={<AlertTriangle className="w-5 h-5 text-google-red" />}
                        title="Action Verb Usage"
                        description="Your resume uses too many passive phrases and weak verbs."
                        recommendation="Replace phrases like 'Responsible for managing' with strong action verbs like 'Led', 'Implemented', or 'Orchestrated'."
                        score={contentScore < 75 ? "Low" : contentScore < 90 ? "Medium" : "High"}
                      />
                      
                      <RecommendationCard
                        icon={<Info className="w-5 h-5 text-google-green" />}
                        title="Section Organization"
                        description="Your resume sections follow standard conventions, making it easy for both ATS and recruiters to parse."
                        recommendation="Maintain clear section headers like 'Work Experience', 'Education', and 'Skills'."
                        score="High"
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={() => {
                      setActiveTab('upload');
                      setAtsScore(0);
                      setResumeFile(null);
                      setJobDescription('');
                    }}
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
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
