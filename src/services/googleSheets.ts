
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
    
    // Instead of using fetch directly, we'll create a FormData object and submit it via a hidden iframe
    // This is a common workaround for CORS issues with Google Apps Script
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_SHEETS_WEB_APP_URL;
    form.target = '_blank'; // This will open in a new tab, but we'll hide it
    form.style.display = 'none';
    
    // Convert our JSON data to a single form field
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify(data);
    form.appendChild(input);
    
    // Add the form to the body
    document.body.appendChild(form);
    
    // Submit the form
    form.submit();
    
    // Clean up after submission
    setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);
    
    console.log('Google Sheets submission initiated via form');
    
    // Return a successful result
    return { success: true };
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
};
