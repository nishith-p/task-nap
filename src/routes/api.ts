import express from 'express';

import authRouter from './v1_0/auth.route';

const router = express.Router();

router.use('/v1_0/auth', authRouter);

export default router;
