import express from 'express';

import * as taskController from '../../controllers/task.controller';
import * as projectController from '../../controllers/project.controller';
import * as authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.get('/', authMiddleware.authRequired, projectController.getProjects); //View own tasks

router.get('/:projectId', authMiddleware.authRequired, taskController.getTasksForProject);
router.post('/:projectId', authMiddleware.authRequired, taskController.createTask);

router.get('/:taskId', projectController.getProject); //View a task
router.patch('/:taskId', projectController.getProject); //Edit a task
router.delete('/:taskId', projectController.getProject); //Delete a task

router.patch('/:taskId/status', projectController.getProject); //Change task status
router.patch('/:taskId/assign', projectController.getProject); //Assign a task
router.patch('/:taskId/unassign', projectController.getProject); //Deassign a task

export default router;
