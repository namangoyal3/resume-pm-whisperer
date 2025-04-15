
import React, { useCallback, useState } from 'react';
import { Upload, File, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    // Accept only PDF and DOCX files
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or DOCX file only');
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or DOCX file only",
        variant: "destructive",
      });
      return false;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      toast({
        title: "File Too Large",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileUpload(file);
      }
    }
  }, [onFileUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileUpload(file);
      }
    }
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-md p-6 ${
          isDragging ? 'border-google-blue bg-blue-50' : 'border-gray-300'
        } ${error ? 'border-red-400' : ''} transition-colors duration-200 ease-in-out`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <div className={`p-3 rounded-full ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <Upload className={`w-6 h-6 ${isDragging ? 'text-google-blue' : 'text-gray-500'}`} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Drag and drop your resume or click to browse
            </p>
            <p className="text-xs text-gray-500">
              PDF or DOCX files only (max 5MB)
            </p>
          </div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-google-blue rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <File className="w-4 h-4 mr-2" />
            Select Resume
          </label>
        </div>
      </div>
      
      {error && (
        <div className="mt-2 flex items-center text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};
