import { Router } from 'express';
import { authenticate, verify, logout } from '../handlers/login.js';

const router = Router();

router.get('/login/authenticate', authenticate);
router.get('/login/verify', verify);
router.get('/logout', logout);

export default router;
