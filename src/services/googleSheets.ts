
import { createClient } from '@supabase/supabase-js';

// Google Sheets Web App URL from deployment
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwqhELI1OBpnhBvRklGnomrUYe8c-A9J3ym1dA7_N4X2Wa9vd3izFsFspbD5MMxeNSWzA/exec';

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
  sendEmailFeedback?: boolean; // New field to indicate if feedback should be emailed
}

export const saveResumeAnalysis = async (data: ResumeSubmission) => {
  try {
    // Log the data being sent to help with debugging
    console.log('Sending data to Google Sheets:', data);
    
    // Create a form data object to submit via hidden iframe
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    // Use fetch API to send the data in the background
    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Use no-cors mode to avoid CORS issues
    });
    
    console.log('Google Sheets submission completed');
    
    // Always send email feedback regardless of user choice
    if (data.email) {
      await sendEmailFeedback({
        email: data.email,
        name: data.name || '',
        atsScore: data.atsScore,
        keywordScore: data.keywordScore,
        contentScore: data.contentScore,
        overallScore: data.overallScore,
        resumeFileName: data.fileName,
        jobTitle: data.jobTitle,
        expert: data.expert || ''
      });
    }
    
    // Return a successful result
    return { success: true };
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
};

// Function to send ATS feedback via email
export const sendEmailFeedback = async (data: {
  email: string;
  name: string;
  atsScore: number;
  keywordScore: number;
  contentScore: number;
  overallScore: number;
  resumeFileName: string;
  jobTitle?: string;
  expert?: string;
}) => {
  try {
    // Using fetch to send email data in the background
    console.log('Sending email feedback request:', data);
    
    const formData = new FormData();
    formData.append('emailData', JSON.stringify(data));
    
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Use no-cors mode to avoid CORS issues
    });
    
    console.log('Email feedback request completed');
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email feedback:', error);
    throw error;
  }
};
