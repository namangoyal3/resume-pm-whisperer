
interface AnalysisResult {
  timestamp: string;
  fileName: string;
  atsScore: number;
  keywordScore: number;
  contentScore: number;
  overallScore: number;
}

export const analyzeResume = async (file: File, jobDescription: string): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('jobDescription', jobDescription);

  try {
    const response = await fetch('https://kiknueebjtqoipkdjdnm.supabase.co/functions/v1/google-sheets-save', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze resume');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};
