
import { getGrokChatCompletion, GrokMessage } from './grokApi';

interface AnalysisResult {
  timestamp: string;
  fileName: string;
  atsScore: number;
  keywordScore: number;
  contentScore: number;
  overallScore: number;
  feedback: string;
}

/**
 * Helper function to read a File as text.
 */
const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as text'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    reader.readAsText(file);
  });
};

/**
 * Calls Grok API to analyze the resume against the job description and optional expert profile.
 * @param file - The resume file uploaded by the user
 * @param jobDescription - The job description text
 * @param expertProfile - Optional selected expert name for personalized feedback
 * @param apiKey - The Grok API key (should be stored securely / provided by user/session)
 * @returns AnalysisResult with scores and feedback
 */
export const analyzeResume = async (
  file: File,
  jobDescription: string,
  expertProfile?: string,
  apiKey?: string
): Promise<AnalysisResult> => {
  if (!apiKey) {
    throw new Error('Grok API key is required for resume analysis.');
  }

  // Read resume file content as text
  const resumeText = await readFileAsText(file);

  // Prepare prompt messages for Grok API
  const systemMessage: GrokMessage = {
    role: 'system',
    content: `You are an expert career advisor and resume reviewer AI. Analyze the resume compared to the job description and provide:
1) ATS compatibility score (0-100),
2) Keyword match score (0-100),
3) Content quality score (0-100),
4) Overall score (0-100),
5) A concise expert feedback explaining the scores and suggesting improvements.

Respond in JSON format with keys: atsScore, keywordScore, contentScore, overallScore, feedback.`
  };

  const userContent = `Resume content:
${resumeText}

Job description:
${jobDescription}

${expertProfile ? `Provide feedback as if you are the expert: ${expertProfile}.` : ''}

Please reply only with the JSON object.`;

  const userMessage: GrokMessage = {
    role: 'user',
    content: userContent,
  };

  const request = {
    model: "gpt-4o-mini", // Assuming the model name for Grok API; adjust if needed
    messages: [systemMessage, userMessage],
    temperature: 0.3,
    max_tokens: 1000,
    top_p: 1,
  };

  const response = await getGrokChatCompletion(apiKey, request);

  // Parse the content of the assistant's message (assumed to be JSON)
  const content = response.choices[0]?.message?.content ?? "{}";
  let parsed: any = {};
  try {
    parsed = JSON.parse(content);
  } catch (err) {
    throw new Error(`Failed to parse Grok API response JSON: ${err}`);
  }

  // Validate parsed keys and fallback to zeros if missing
  const atsScore = typeof parsed.atsScore === 'number' ? parsed.atsScore : 0;
  const keywordScore = typeof parsed.keywordScore === 'number' ? parsed.keywordScore : 0;
  const contentScore = typeof parsed.contentScore === 'number' ? parsed.contentScore : 0;
  const overallScore = typeof parsed.overallScore === 'number' ? parsed.overallScore : 0;
  const feedback = typeof parsed.feedback === 'string' ? parsed.feedback : "";

  return {
    timestamp: new Date().toISOString(),
    fileName: file.name,
    atsScore,
    keywordScore,
    contentScore,
    overallScore,
    feedback,
  };
};
