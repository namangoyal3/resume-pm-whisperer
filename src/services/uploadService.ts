
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
    
    // Generate more realistic scores based on file type/name patterns
    // to simulate varied feedback scenarios
    const generateScore = (base: number, variance: number) => {
      const randomVariance = Math.floor(Math.random() * variance) - (variance / 2);
      return Math.max(40, Math.min(98, base + randomVariance));
    };
    
    // Base scores slightly dependent on file properties to simulate
    // different results for different files
    let atsBase = 70;
    let keywordBase = 65;
    let contentBase = 72;
    
    // Adjust base scores based on filename patterns
    if (file.name.toLowerCase().includes('ats')) {
      atsBase += 15; // Files with "ATS" in the name get better ATS scores
    }
    
    if (file.name.toLowerCase().includes('senior') || file.name.toLowerCase().includes('sr')) {
      contentBase += 10; // Senior resumes tend to have better content
    }
    
    if (file.name.toLowerCase().includes('product') || file.name.toLowerCase().includes('pm')) {
      keywordBase += 12; // Product Manager specific resumes have better keyword matches
    }
    
    // Add a small delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const atsScore = generateScore(atsBase, 15);
    const keywordScore = generateScore(keywordBase, 20);
    const contentScore = generateScore(contentBase, 18);
    
    // Overall score is a weighted average with slight randomization
    const rawOverallScore = (atsScore * 0.3) + (keywordScore * 0.4) + (contentScore * 0.3);
    const overallScore = Math.floor(generateScore(rawOverallScore, 5));
    
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
