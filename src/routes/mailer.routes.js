import { Router } from 'express';
import { sendMail } from '../controllers/mailer.controller.js';

const router = Router();

// Example usage
const emailData = {
    fullname: 'John Doe',
    message: 'Hello, World!',
    redFileName: 'red-file name'
  };

router.get('/mail', (req, res) => {
  sendMail()
});

export default router;