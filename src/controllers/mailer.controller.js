import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import ejs from 'ejs';

import connectionDetails from '../config/env-reader.js';

// Create a transporter object with your SMTP server details
const transporter = nodemailer.createTransport({
  host: connectionDetails.mailHost,
  port: connectionDetails.mailPort, // SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: connectionDetails.mailAuth.mailUser,
    pass: connectionDetails.mailAuth.mailPass
  }
});

// Function to send an email
const sendEmail = async (to, subject, templateFile, data) => {
  try {
    // Read the email template file
    const template = await fs.readFile(templateFile, 'utf8');

    // Render the template with the provided data
    const html = ejs.render(template, data);

    // Configure the email options
    const mailOptions = {
      from: connectionDetails.mailSource,
      to,
      subject,
      html
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};



export {sendEmail};

//sendEmail('recipient@example.com', 'Example Subject', 'path/to/template.ejs', emailData);