import logger from '../config/logger.js';

import nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';
import ejs from 'ejs';
import path from 'path';
import db from '../models/index.js';
const User = db.user;

import connectionDetails from '../config/env-reader.js';



// Create a transporter object with your SMTP server details
const transporter = nodemailer.createTransport({
  host: connectionDetails.mailHost,
  port: connectionDetails.mailPort, 
  secure: true,
  auth: {
    user: connectionDetails.mailAuth.mailUser,
    pass: connectionDetails.mailAuth.mailPass
  }
});

// Function to send an email
const sendEmail = async (templateFile, data, res) => {
  try {
    const fileLocation = path.resolve(__dirname, templateFile);

    // Read the email template file
    const template = await readFile(fileLocation, 'utf8');


    // Render the template with the provided data
    const html = ejs.render(template, data);

    const clientEmail = {
      from: connectionDetails.mailSource,
      to: data.email,
      subject: `Solicitud de reserva ${data.fullName}`,
      html
    };

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
    const supportInfo = await transporter.sendMail(supportEmail);
    logger.info('Support email sent:', supportInfo.messageId);
    const clientInfo = await transporter.sendMail(clientEmail);
    logger.info('Client email sent:', clientInfo.messageId);

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