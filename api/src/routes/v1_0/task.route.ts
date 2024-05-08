import express from 'express';

import * as taskController from '../../controllers/task.controller';
import * as taskValidator from '../../validators/task.validator';
import * as authMiddleware from '../../middlewares/auth';
import validationMiddleware from '../../middlewares/validate';

const router = express.Router();

router.get('/me', authMiddleware.authRequired, taskController.getTasksForUser);

router.get(
  '/:projectId',
  validationMiddleware(taskValidator.getTasksForProjectSchema),
  authMiddleware.authRequired,
  taskController.getTasksForProject
);

router.post(
  '/:projectId',
  validationMiddleware(taskValidator.createTaskSchema),
  authMiddleware.authRequired,
  taskController.createTask
);

router.get(
  '/:projectId/:taskId',
  validationMiddleware(taskValidator.getTaskDetailsSchema),
  authMiddleware.authRequired,
  taskController.getTaskDetails
);

router.patch(
  '/:projectId/:taskId',
  validationMiddleware(taskValidator.updateTaskSchema),
  authMiddleware.authRequired,
  taskController.updateTask
);

router.patch(
  '/:projectId/:taskId/status',
  validationMiddleware(taskValidator.updateTaskStatusSchema),
  authMiddleware.authRequired,
  taskController.updateTaskStatus
);

router.patch(
  '/:projectId/:taskId/assign',
  validationMiddleware(taskValidator.updateTaskAssigneeSchema),
  authMiddleware.authRequired,
  taskController.addUser
);

router.delete(
  '/:taskId',
  validationMiddleware(taskValidator.deleteTaskSchema),
  authMiddleware.authRequired,
  taskController.deleteTask
);

export default router;
