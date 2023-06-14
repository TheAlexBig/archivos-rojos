import logger from '../config/logger.js';

import nodemailer from 'nodemailer';
import { readFile, close  } from 'fs/promises';
import ejs from 'ejs';
import path from 'path';
import db from '../models/index.js';
const User = db.user;

import connectionDetails from '../config/env-reader.js';

const config = {
  pool: true,
  host: connectionDetails.mailHost,
  port: connectionDetails.mailPort, 
  secure: true,
  auth: {
    user: connectionDetails.mailAuth.mailUser,
    pass: connectionDetails.mailAuth.mailPass
  }
}

// Create a transporter object with your SMTP server details
const transporter = nodemailer.createTransport(config);

transporter.verify(function (error, success) {
  if (error) {
    logger.error(error);
  } else {
    logger.info("Server is ready to take our messages");
  }
});

// Function to send an email
const sendEmail = async (templateFile, data, res) => {
  try {
    const fileLocation = path.resolve(__dirname, templateFile);
    // Read the email template file
    const fileHandle = await readFile(fileLocation, 'utf8');
    const template = fileHandle.toString();
    // Close the file handle after reading
    await close(fileHandle);

    // Render the template with the provided data
    const html = ejs.render(template, data);

    const latestUser = await User.findOne({
      attributes: ['email'],
      order: [['created_at', 'DESC']]
    });

    const supportEmail = {
      from: connectionDetails.mailSource,
      to: latestUser.email,
      subject: `Solicitud de reserva ${data.fullName}`,
      html
    };

    // Send the emails
    const supportInfo = transporter.sendMail(supportEmail);
    logger.info('Support email sent:', supportInfo.messageId);

    // Send response back with status code 200
    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    logger.error('Error occurred while sending emails.', error);
    res.status(500).send({
      message: 'Error occurred while sending emails.',
    });
  }
};



export {sendEmail, transporter};