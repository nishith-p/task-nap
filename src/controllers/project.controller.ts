/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, NextFunction } from 'express';
import { and, eq } from 'drizzle-orm';
import createHttpError from 'http-errors';

import { db } from '../db/connect';
import { projects, userOnProjects } from '../db/schema';
import { sendApiResponse } from '../util/response';

const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, +req.params.projectId),
    });

    if (!project) {
      throw createHttpError(400, 'Project not found');
    }

    sendApiResponse(res, project);
  } catch (error) {
    next(error);
  }
};

const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectsObj = await db.query.projects.findMany({
      columns: {
        projectDesc: false,
        projectOwnerId: false,
      },
      with: {
        projectCreator: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            profilePic: true,
          },
        },
      },
    });

    sendApiResponse(res, projectsObj);
  } catch (error) {
    next(error);
  }
};

const getCreatedProjectsByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdProjects = await db.query.projects.findMany({
      where: eq(projects.projectOwnerId, +req.params.userId),
      columns: {
        projectDesc: false,
        projectOwnerId: false,
      },
    });

    sendApiResponse(res, createdProjects);
  } catch (error) {
    next(error);
  }
};

const getAssignedProjectsByUser = (req: Request, res: Response, next: NextFunction) => {
  res.send('Get Assigned Projects');
};

const createProject = async (req: Request, res: Response, next: NextFunction) => {
  const newProjectObj = {
    projectOwnerId: res.locals.user.id,
    ...req.body,
  };

  try {
    await db.insert(projects).values(newProjectObj);

    sendApiResponse(res, 'Project created');
  } catch (error) {
    next(error);
  }
};

const updateProject = (req: Request, res: Response, next: NextFunction) => {
  res.send('Update Project');
};

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProjectObj = await db
      .delete(projects)
      .where(
        and(eq(projects.id, +req.params.projectId), eq(projects.projectOwnerId, res.locals.user.id))
      )
      .returning();

    if (deletedProjectObj.length === 0) {
      throw createHttpError(403, 'You do not have permission or project not found');
    }

    sendApiResponse(res, 'Project deleted');
  } catch (error) {
    next(error);
  }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (+req.body.userId === res.locals.user.id) {
      throw createHttpError(409, 'You are already assigned');
    }

    if (!(await checkProjectOwner(+req.params.projectId, res.locals.user.id))) {
      throw createHttpError(403, 'You do not have permission');
    }

    await db.insert(userOnProjects).values({
      userId: parseInt(req.body.userId),
      projectId: parseInt(req.params.projectId),
    });

    sendApiResponse(res, 'User added to project');
  } catch (error) {
    next(error);
  }
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(await checkProjectOwner(+req.params.projectId, res.locals.user.id))) {
      throw createHttpError(403, 'You do not have permission');
    }

    const removedUser = await db
      .delete(userOnProjects)
      .where(
        and(
          eq(userOnProjects.userId, +req.body.userId),
          eq(userOnProjects.projectId, +req.params.projectId)
        )
      )
      .returning();

    if (removedUser.length === 0) {
      throw createHttpError(400, 'User not found');
    }

    sendApiResponse(res, 'User removed from project');
  } catch (error) {
    next(error);
  }
};

const checkProjectOwner = async (projectId: number, ownerId: number) => {
  const isProjectCreator = await db.query.projects.findFirst({
    where: and(eq(projects.projectOwnerId, ownerId), eq(projects.id, projectId)),
  });

  return isProjectCreator;
};

export {
  getProject,
  getProjects,
  getCreatedProjectsByUser,
  getAssignedProjectsByUser,
  createProject,
  updateProject,
  deleteProject,
  addUser,
  removeUser,
};
