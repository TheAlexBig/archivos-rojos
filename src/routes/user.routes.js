import { Router } from 'express';
import { insertUser } from '../controllers/user.controller';

const router = Router();

router.get('/user', async (req, res) => {
    await insertUser(req, res);
});

export default router;