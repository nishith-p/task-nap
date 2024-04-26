import express from 'express';

import * as projectController from '../../controllers/project.controller';
import * as authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.get('/', authMiddleware.authRequired, projectController.getProjects);
router.post('/', authMiddleware.authRequired, projectController.createProject);

router.get('/:projectId', authMiddleware.authRequired, projectController.getProject);
router.patch('/:projectId', authMiddleware.authRequired, projectController.updateProject);
router.delete('/:projectId', authMiddleware.authRequired, projectController.deleteProject);

router.post('/:projectId/assign', authMiddleware.authRequired, projectController.addUser);
router.delete('/:projectId/unassign', authMiddleware.authRequired, projectController.removeUser);

router.get(
  '/:userId/created-projects',
  authMiddleware.authRequired,
  projectController.getCreatedProjectsByUser
);
router.get(
  '/:userId/assigned-projects',
  authMiddleware.authRequired,
  projectController.getAssignedProjectsByUser
);

export default router;
