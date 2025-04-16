
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { GooglePMHeader } from '@/components/GooglePMHeader';
import { analyzeResume } from '@/services/uploadService';
import { Upload, FileText } from 'lucide-react';
import { UploadForm } from '@/components/UploadForm';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { HomePage } from '@/components/HomePage';
import { ExpertGallery } from '@/components/ExpertGallery';
import { LeadForm } from '@/components/LeadForm';
import { LimitedPreview } from '@/components/LimitedPreview';
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  
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
    
    if (!selectedExpert) {
      toast({
        title: "Expert Not Selected",
        description: "Please select an expert to review your resume.",
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
      setActiveTab('preview');
      
      toast({
        title: "Initial Analysis Complete",
        description: "Preview your results and complete your profile to see the full analysis.",
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

  const handleLeadSubmit = (leadData: any) => {
    setLeadSubmitted(true);
    setActiveTab('results');
    toast({
      title: "Profile Completed",
      description: "Your full expert analysis is now available!",
    });
  };

  const handleReset = () => {
    setActiveTab('home');
    setAtsScore(0);
    setResumeFile(null);
    setJobDescription('');
    setSelectedExpert(null);
    setLeadSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <GooglePMHeader />
      
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-5'}`}>
            <TabsTrigger value="home" disabled={isAnalyzing}>
              Home
            </TabsTrigger>
            <TabsTrigger value="upload" disabled={isAnalyzing}>
              <Upload className="w-4 h-4 mr-2" />
              {!isMobile && "Upload Resume"}
            </TabsTrigger>
            <TabsTrigger value="experts" disabled={isAnalyzing || !resumeFile}>
              {!isMobile && "Select "}Expert
            </TabsTrigger>
            {isMobile ? (
              <TabsTrigger value="preview" disabled={atsScore === 0}>
                Preview
              </TabsTrigger>
            ) : (
              <TabsTrigger value="preview" disabled={atsScore === 0}>
                <FileText className="w-4 h-4 mr-2" />
                Preview Analysis
              </TabsTrigger>
            )}
            {!isMobile && (
              <TabsTrigger value="results" disabled={!leadSubmitted}>
                Full Feedback
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="home">
            <HomePage onGetStarted={() => setActiveTab('upload')} />
          </TabsContent>
          
          <TabsContent value="upload">
            <UploadForm 
              jobDescription={jobDescription}
              onJobDescriptionChange={setJobDescription}
              onFileUpload={setResumeFile}
              resumeFile={resumeFile}
              isAnalyzing={isAnalyzing}
              onNext={() => setActiveTab('experts')}
            />
          </TabsContent>
          
          <TabsContent value="experts">
            <ExpertGallery 
              selectedExpert={selectedExpert}
              onExpertSelect={setSelectedExpert}
              onAnalyze={handleAnalyzeResume}
              isAnalyzing={isAnalyzing}
            />
          </TabsContent>
          
          <TabsContent value="preview">
            <LimitedPreview 
              atsScore={atsScore}
              keywordScore={keywordScore}
              contentScore={contentScore}
              overallScore={overallScore}
              expertName={selectedExpert || ""}
              onUnlock={() => setActiveTab('lead')}
            />
          </TabsContent>
          
          <TabsContent value="lead">
            <LeadForm 
              onSubmit={handleLeadSubmit}
              resumeFileName={resumeFile?.name}
              jobDescription={jobDescription}
              selectedExpert={selectedExpert || ""}
              atsScore={atsScore}
              keywordScore={keywordScore}
              contentScore={contentScore}
              overallScore={overallScore}
            />
          </TabsContent>
          
          <TabsContent value="results">
            {leadSubmitted ? (
              <ResultsDashboard 
                atsScore={atsScore}
                keywordScore={keywordScore}
                contentScore={contentScore}
                overallScore={overallScore}
                jobDescription={jobDescription}
                resumeFileName={resumeFile?.name}
                onReset={handleReset}
                expertName={selectedExpert || ""}
              />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <h2 className="text-2xl font-bold mb-4">Access Restricted</h2>
                <p className="text-gray-600 mb-4">
                  Please complete your profile to access the full expert analysis of your resume.
                </p>
                <Button onClick={() => setActiveTab('lead')} className="bg-google-blue hover:bg-blue-600">
                  Complete Your Profile
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
