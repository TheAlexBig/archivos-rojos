import { Router } from 'express';
import { getRedFiles, getRedFile } from '../controllers/red-file.controller.js';
import {sendEmail} from "../controllers/mailer.controller";

const router = Router();

router.get('/red-file', async (req, res) => {
  await getRedFiles(req, res);
});

router.get('/red-file/:code', async (req, res) => {
  await getRedFile(req, res);
});

router.post('/red-file/contact', async (req, res) => {
  const {fullName, email, date, description, code} = req.query;

  const data = {
    fullName: fullName || 'John Doe',
    email: email || 'test@gmail.com',
    date: date || '05/08/2023',
    description: description || 'Hello, World!',
    code: code || 'red-file name'
  };

  const templateFile = '../templates/request.ejs';

  await sendEmail(templateFile, data, res)
});


export default router;