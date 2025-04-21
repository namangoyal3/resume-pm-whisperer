
import { createClient } from '@supabase/supabase-js';

// Updated Google Sheets Web App URL from deployment
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzEsdbxcz2LnbWEkEk17dLW8U62P8ayMyd8HIHm12WSXgxIKvbScZLppRGfC5XjDaPJEg/exec';

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
    
    // Create a form data object to submit to Google Sheets
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    // Use fetch API to send the data to Google Sheets
    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Use no-cors mode to avoid CORS issues
    });
    
    console.log('Google Sheets submission completed');
    
    // Always send email feedback
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
    // Using fetch to send email data
    console.log('Sending email feedback request:', data);
    
    const formData = new FormData();
    formData.append('emailData', JSON.stringify(data));
    formData.append('sendEmail', 'true'); // Explicitly request email sending
    
    // Create an iframe to handle the request in the background
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.name = 'email-submit-frame';
    
    // Use the iframe to submit the form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_SHEETS_WEB_APP_URL;
    form.target = iframe.name;
    
    // Add form data
    for (const [key, value] of formData.entries()) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = typeof value === 'string' ? value : JSON.stringify(value);
      form.appendChild(input);
    }
    
    // Append form to document and submit
    document.body.appendChild(form);
    form.submit();
    
    // Clean up the DOM after submission
    setTimeout(() => {
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    }, 3000);
    
    console.log('Email feedback request completed');
    
    return { success: true };
  } catch (error) {
    console.error('Error sending email feedback:', error);
    throw error;
  }
};
