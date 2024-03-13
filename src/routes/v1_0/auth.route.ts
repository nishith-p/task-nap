import express from 'express';

import * as authController from '../../controllers/auth.controller';
import { deserializeUser } from '../../middlewares/auth';

const router = express.Router();

router.post('/login', authController.loginUser);

router.post('/register', authController.createUser);

router.get('/logout', authController.logoutUser);

router.get('/refresh-token', authController.refreshAuth);

router.get('/protected', deserializeUser, authController.testProtected);

export default router;
