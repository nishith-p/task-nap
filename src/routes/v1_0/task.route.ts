import express from 'express';

import * as taskController from '../../controllers/task.controller';
import * as authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.get('/me', authMiddleware.authRequired, taskController.getTasksForUser);

router.get('/:projectId', authMiddleware.authRequired, taskController.getTasksForProject);
router.post('/:projectId', authMiddleware.authRequired, taskController.createTask);

router.delete('/:taskId', authMiddleware.authRequired, taskController.deleteTask);

router.get('/:projectId/:taskId', authMiddleware.authRequired, taskController.getTaskDetails);
router.patch('/:projectId/:taskId', authMiddleware.authRequired, taskController.updateTask);

router.patch(
  '/:projectId/:taskId/status',
  authMiddleware.authRequired,
  taskController.updateTaskStatus
);

router.patch('/:projectId/:taskId/assign', authMiddleware.authRequired, taskController.addUser);

export default router;
