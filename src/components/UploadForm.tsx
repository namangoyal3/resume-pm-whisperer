
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from '@/components/FileUploader';
import { FileText } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

interface UploadFormProps {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  onFileUpload: (file: File) => void;
  resumeFile: File | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({
  jobDescription,
  onJobDescriptionChange,
  onFileUpload,
  resumeFile,
  isAnalyzing,
  onAnalyze
}) => {
  const formatFilename = (name: string) => {
    if (name.length > 25) {
      return name.substring(0, 22) + '...';
    }
    return name;
  };

  return (
    <div className="space-y-6">
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
            <FileUploader onFileUpload={onFileUpload} isUploading={isAnalyzing} />
            
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
              onChange={(e) => onJobDescriptionChange(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onAnalyze} 
          disabled={isAnalyzing || !resumeFile}
          className="px-8 py-6 text-lg bg-google-blue hover:bg-blue-600"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
        </Button>
      </div>
    </div>
  );
};
