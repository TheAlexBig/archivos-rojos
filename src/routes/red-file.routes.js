import { Router } from 'express';
import { getRedFiles, getRedFile } from '../controllers/red-file.controller.js';
import {sendEmail} from "../controllers/mailer.controller";
import { join } from 'path';

const pdfFilePath = join(__dirname, 'pdfs', 'Catálogo.pdf');


const router = Router();

router.get('/', async (req, res) => {
  await getRedFiles(req, res);
});


router.get('/download-pdf', (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="Catálogo.pdf"');
  res.sendFile(pdfFilePath);
});

router.get('/:code', async (req, res) => {
  await getRedFile(req, res);
});

const redFileContact = '../templates/request.ejs';

router.post('/contact', async (req, res) => {
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

export default router;