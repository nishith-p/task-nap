import express from 'express';

import authRouter from './v1_0/auth.route';
import projectRouter from './v1_0/project.route';
import taskRouter from './v1_0/task.route';
import { deserializeUser } from '../middlewares/auth';

const router = express.Router();

router.use(deserializeUser);

router.use('/v1_0/auth', authRouter);
router.use('/v1_0/projects', projectRouter);
router.use('/v1_0/tasks', taskRouter);

export default router;
