import express from 'express';

import * as taskController from '../../controllers/task.controller';
import * as projectController from '../../controllers/project.controller';
import * as authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.get('/', authMiddleware.authRequired, projectController.getProjects); //View own tasks

router.get('/:projectId', authMiddleware.authRequired, taskController.getTasksForProject);
router.post('/:projectId', authMiddleware.authRequired, taskController.createTask);

router.patch('/:taskId', projectController.getProject); //Edit a task
router.delete('/:taskId', authMiddleware.authRequired, taskController.deleteTask);

router.get('/:projectId/:taskId', authMiddleware.authRequired, taskController.getTaskDetails);
router.patch(
  '/:projectId/:taskId/status',
  authMiddleware.authRequired,
  taskController.updateTaskStatus
);
router.patch('/:projectId/:taskId/assign', projectController.getProject); //Assign a task
router.patch('/:projectId/:taskId/unassign', projectController.getProject); //Deassign a task

export default router;
