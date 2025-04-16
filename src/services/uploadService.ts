
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
    // For demo purposes, we're using a simulated response
    // In production, replace this with the actual API call:
    // const response = await fetch('https://kiknueebjtqoipkdjdnm.supabase.co/functions/v1/google-sheets-save', {
    //   method: 'POST',
    //   body: formData,
    // });
    
    // Simulate API response for demonstration
    // Generate random scores between 65 and 98
    const getRandomScore = () => Math.floor(Math.random() * 34) + 65;
    
    // Add a small delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const atsScore = getRandomScore();
    const keywordScore = getRandomScore();
    const contentScore = getRandomScore();
    // Overall score is a weighted average
    const overallScore = Math.floor((atsScore * 0.3) + (keywordScore * 0.4) + (contentScore * 0.3));
    
    return {
      timestamp: new Date().toISOString(),
      fileName: file.name,
      atsScore,
      keywordScore,
      contentScore,
      overallScore
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};
