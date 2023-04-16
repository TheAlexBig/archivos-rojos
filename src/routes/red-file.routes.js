import { Router } from 'express';
import { getRedFiles } from '../controllers/red-file.controller.js';

const router = Router();

router.get('/red-file', (req, res) => {
  getRedFiles(req, res);
});

export default router;