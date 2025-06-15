import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import {
  authenticate,
  AuthenticatedRequest,
} from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authenticate, (req, res) => {
  res.json({ user: (req as AuthenticatedRequest).user });
});
router.post('/login', authController.generateToken);
router.post('/logout', authController.expireToken);

export default router;
