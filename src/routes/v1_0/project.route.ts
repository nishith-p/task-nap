import express from 'express';

import * as projectController from '../../controllers/project.controller';
import * as projectValidator from '../../validators/project.validator';
import * as authMiddleware from '../../middlewares/auth';
import validationMiddleware from '../../middlewares/validate';

const router = express.Router();

router.get('/', authMiddleware.authRequired, projectController.getProjects);

router.post(
  '/',
  validationMiddleware(projectValidator.createProjectSchema),
  authMiddleware.authRequired,
  projectController.createProject
);

router.get(
  '/:projectId',
  validationMiddleware(projectValidator.getProjectSchema),
  authMiddleware.authRequired,
  projectController.getProject
);

router.patch(
  '/:projectId',
  validationMiddleware(projectValidator.updateProjectSchema),
  authMiddleware.authRequired,
  projectController.updateProject
);

router.delete(
  '/:projectId',
  validationMiddleware(projectValidator.deleteProjectSchema),
  authMiddleware.authRequired,
  projectController.deleteProject
);

router.post(
  '/:projectId/assign',
  validationMiddleware(projectValidator.addOrRemoveUserSchema),
  authMiddleware.authRequired,
  projectController.addUser
);

router.delete(
  '/:projectId/unassign',
  validationMiddleware(projectValidator.addOrRemoveUserSchema),
  authMiddleware.authRequired,
  projectController.removeUser
);

router.get(
  '/:userId/created-projects',
  validationMiddleware(projectValidator.getUserProjectsSchema),
  authMiddleware.authRequired,
  projectController.getCreatedProjectsByUser
);

router.get(
  '/:userId/assigned-projects',
  validationMiddleware(projectValidator.getUserProjectsSchema),
  authMiddleware.authRequired,
  projectController.getAssignedProjectsByUser
);

export default router;
