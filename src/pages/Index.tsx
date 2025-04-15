
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { GooglePMHeader } from '@/components/GooglePMHeader';
import { analyzeResume } from '@/services/uploadService';
import { Upload, FileText } from 'lucide-react';
import { UploadForm } from '@/components/UploadForm';
import { ResultsDashboard } from '@/components/ResultsDashboard';

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

  const handleReset = () => {
    setActiveTab('upload');
    setAtsScore(0);
    setResumeFile(null);
    setJobDescription('');
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
          
          <TabsContent value="upload">
            <UploadForm 
              jobDescription={jobDescription}
              onJobDescriptionChange={setJobDescription}
              onFileUpload={setResumeFile}
              resumeFile={resumeFile}
              isAnalyzing={isAnalyzing}
              onAnalyze={handleAnalyzeResume}
            />
          </TabsContent>
          
          <TabsContent value="results">
            {atsScore > 0 && (
              <ResultsDashboard 
                atsScore={atsScore}
                keywordScore={keywordScore}
                contentScore={contentScore}
                overallScore={overallScore}
                jobDescription={jobDescription}
                onReset={handleReset}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
