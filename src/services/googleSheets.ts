
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ResumeSubmission {
  timestamp: string;
  fileName: string;
  atsScore: number;
  keywordScore: number;
  contentScore: number;
  overallScore: number;
}

export const saveResumeAnalysis = async (data: ResumeSubmission) => {
  try {
    const { data: response, error } = await supabase
      .functions.invoke('google-sheets-save', {
        body: { data },
      });

    if (error) throw error;
    return response;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
};
