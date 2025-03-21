import { Router } from 'express';
import { redirectToAtlassian, handleAuthCallback } from '../controllers/authController';

const router = Router();

router.get('/', redirectToAtlassian);
router.get('/callback', handleAuthCallback);

export default router;
