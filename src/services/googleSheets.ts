
import { createClient } from '@supabase/supabase-js';

// Google Sheets Web App URL from deployment
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwEhjFJn-JQzea70WE0TGP0zzPQUcPEihKV7qUc8Tl2ofeBxNR7yDPfmzaXIH2yyaVULg/exec';

interface ResumeSubmission {
  timestamp: string;
  fileName: string;
  atsScore: number;
  keywordScore: number;
  contentScore: number;
  overallScore: number;
  jobTitle?: string;
}

export const saveResumeAnalysis = async (data: ResumeSubmission) => {
  try {
    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to save data to Google Sheets');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
};
