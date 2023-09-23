import { Router } from 'express';
import { getRedFiles, getRedFile } from '../controllers/red-file.controller.js';
import {sendEmail} from "../controllers/mailer.controller";
import { join } from 'path';

const pdfFilePath = join(__dirname, 'pdfs', 'example.pdf');


const router = Router();

router.get('/red-file', async (req, res) => {
  await getRedFiles(req, res);
});

router.get('/red-file/:code', async (req, res) => {
  await getRedFile(req, res);
});

const redFileContact = '../templates/request.ejs';

router.post('/red-file/contact', async (req, res) => {
  const {fullName, email, date, description, code} = req.body;

  const data = {
    fullName: fullName || 'John Doe',
    email: email || 'test@gmail.com',
    date: date || '05/08/2023',
    description: description || 'Hello, World!',
    code: code || 'red-file name'
  };

  await sendEmail(redFileContact, data, res)
});

router.get('/download-pdf', (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Catálogo.pdf"');
  res.sendFile(pdfFilePath);
});


export default router;