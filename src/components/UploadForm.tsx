
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from '@/components/FileUploader';
import { FileText, ArrowRight, CheckCircle, TargetIcon, Briefcase, Building } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UploadFormProps {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  onFileUpload: (file: File) => void;
  resumeFile: File | null;
  isAnalyzing: boolean;
  onNext: () => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({
  jobDescription,
  onJobDescriptionChange,
  onFileUpload,
  resumeFile,
  isAnalyzing,
  onNext
}) => {
  const formatFilename = (name: string) => {
    if (name.length > 25) {
      return name.substring(0, 22) + '...';
    }
    return name;
  };

  return (
    <div className="space-y-10">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-3">Upload Your Resume</h1>
        <p className="text-gray-600">
          Upload your resume and provide details about the role you're targeting to get personalized expert feedback.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              <Briefcase className="w-5 h-5 mr-2 text-google-blue" />
              Target Position Details
            </CardTitle>
            <CardDescription>
              Tell us about the role you're applying for
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="role">Target Role</Label>
              <Input id="role" placeholder="e.g. Senior Product Manager" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea 
                id="jobDescription"
                placeholder="Paste the full job description here..."
                className="min-h-[150px]"
                value={jobDescription}
                onChange={(e) => onJobDescriptionChange(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="concerns">Specific Concerns (Optional)</Label>
              <Textarea 
                id="concerns"
                placeholder="Any specific areas you'd like the expert to focus on?"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={onNext} 
          disabled={isAnalyzing || !resumeFile || !jobDescription.trim()}
          className="px-8 py-6 text-lg bg-google-blue hover:bg-blue-600"
        >
          Next: Select Expert
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
