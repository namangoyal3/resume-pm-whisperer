
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
    // We'll use the same Google Sheets Web App URL since it can handle the email sending
    // on the server side via Google Apps Script
    console.log('Sending email feedback request:', data);
    
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_SHEETS_WEB_APP_URL;
    form.target = '_blank';
    form.style.display = 'none';
    
    // Add a special parameter to indicate this is an email request
    const inputData = document.createElement('input');
    inputData.type = 'hidden';
    inputData.name = 'emailData';
    inputData.value = JSON.stringify(data);
    form.appendChild(inputData);
    
    // Add the form to the body
    document.body.appendChild(form);
    
    // Submit the form
    form.submit();
    
    // Clean up after submission
    setTimeout(() => {
      document.body.removeChild(form);
    }, 1000);
    
    console.log('Email feedback request initiated');
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email feedback:', error);
    throw error;
  }
};
