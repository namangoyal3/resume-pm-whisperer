
function doPost(e) {
  try {
    var SPREADSHEET_ID = '1RZMx233m3YvuIydBNeZgExLqWRy9Opk8L3kmuGvGO4A'; // Updated spreadsheet ID
    var sheetName = 'Sheet1'; // Change if your sheet has another name
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(sheetName);

    if (!e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'No post data received.' })).setMimeType(ContentService.MimeType.JSON);
    }

    // Parse JSON data sent in the POST body
    var data = JSON.parse(e.postData.contents);
    
    // Define the expected fields and their order in the sheet
    var headers = ['timestamp', 'fileName', 'atsScore', 'keywordScore', 'contentScore', 'overallScore',
                   'jobTitle', 'name', 'email', 'phone', 'currentRole', 'targetCompanies', 
                   'linkedIn', 'jobSearchTimeline', 'budget', 'additionalInfo', 'expert', 'sendEmailFeedback'];
    
    // Prepare the row to append with values matching the order of headers
    var row = headers.map(function(header) {
      // Check if the data has the key, else blank string
      var value = data[header];
      if (value === undefined) return '';
      return value;
    });

    // Append the row to the sheet
    sheet.appendRow(row);
    
    // Optional: Send email if sendEmailFeedback is true and email is provided
    if (data.sendEmailFeedback && data.email) {
      sendFeedbackEmail(data);
    }
    
    // Return JSON success
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Sends a feedback email based on the data provided.
 * You should customize email contents as needed.
 */
function sendFeedbackEmail(data) {
  try {
    var subject = 'Your Resume ATS Feedback';
    var body = 'Hello ' + (data.name || 'Candidate') + ',\n\n' +
      'Thank you for submitting your resume for review.\n\n' +
      'Here are your scores:\n' +
      '- ATS Score: ' + data.atsScore + '\n' +
      '- Keyword Score: ' + data.keywordScore + '\n' +
      '- Content Score: ' + data.contentScore + '\n' +
      '- Overall Score: ' + data.overallScore + '\n\n' +
      'Best regards,\nYour Team';

    MailApp.sendEmail(data.email, subject, body);
  } catch (emailError) {
    Logger.log('Error sending feedback email: ' + emailError.message);
  }
}
