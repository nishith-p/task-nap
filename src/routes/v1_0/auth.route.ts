import express from 'express';

import * as authController from '../../controllers/auth.controller';
import * as authValidator from '../../validators/auth.validator';
import * as authMiddleware from '../../middlewares/auth';
import validationMiddleware from '../../middlewares/validate';

const router = express.Router();

router.post(
  '/login',
  validationMiddleware(authValidator.loginUserSchema),
  authController.loginUser
);

router.post(
  '/register',
  validationMiddleware(authValidator.createUserSchema),
  authController.createUser
);

router.get('/logout', authController.logoutUser);

router.get('/refresh-token', authController.refreshAuth);

router.get('/protected', authMiddleware.authRequired, authController.testProtected);

export default router;
