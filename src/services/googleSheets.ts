
import { createClient } from '@supabase/supabase-js';

// Google Sheets Web App URL from deployment
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwEhjFJn-JQzea70WE0TGP0zzPQUcPEihKV7qUc8Tl2ofeBxNR7yDPfmzaXIH2yyaVULg/exec';

export interface ResumeSubmission {
  timestamp: string;
  fileName: string;
  atsScore: number;
  keywordScore: number;
  contentScore: number;
  overallScore: number;
  jobTitle?: string;
  // Lead information fields (optional)
  name?: string;
  email?: string;
  phone?: string;
  currentRole?: string;
  targetCompanies?: string;
  linkedIn?: string;
  jobSearchTimeline?: string;
  budget?: string;
  additionalInfo?: string;
  expert?: string;
}

export const saveResumeAnalysis = async (data: ResumeSubmission) => {
  try {
    // Log the data being sent to help with debugging
    console.log('Sending data to Google Sheets:', data);
    
    // Use no-cors mode to handle CORS issues
    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',  // This helps with CORS issues
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Since no-cors doesn't return a readable response, we can't check response.ok
    // Instead, we assume it worked if no error was thrown
    console.log('Google Sheets submission completed');
    
    // Return a successful result
    return { success: true };
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
};
