import { Response, Request, NextFunction } from 'express';
import { and, eq } from 'drizzle-orm';
import createHttpError from 'http-errors';

import { db } from '../db/connect';
import { projects, tasks, userOnProjects } from '../db/schema';
import { sendApiResponse } from '../util/response';

const getTasksForProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isProjectMember = await checkProjectMember(+req.params.projectId, res.locals.user.id);
    const isProjectOwner = await checkProjectOwner(+req.params.projectId, res.locals.user.id);

    if (!isProjectMember && !isProjectOwner) {
      throw createHttpError(403, 'You do not have permission to view tasks of this project');
    }

    const tasksObj = await db.query.tasks.findMany({
      where: eq(tasks.projectId, +req.params.projectId),
    });

    sendApiResponse(res, tasksObj);
  } catch (error) {
    next(error);
  }
};

const getProjects = async (_req: Request, res: Response, next: NextFunction) => {
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

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskObj = {
    taskCreatorId: res.locals.user.id,
    projectId: +req.params.projectId,
    ...req.body,
  };

  try {
    if (!(await checkProjectOwner(+req.params.projectId, res.locals.user.id))) {
      throw createHttpError(403, 'You do not have permission to add a task to this project');
    }

    await db.insert(tasks).values(taskObj);

    sendApiResponse(res, 'Task created');
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectsObj = await db
      .update(projects)
      .set(req.body)
      .where(
        and(eq(projects.id, +req.params.projectId), eq(projects.projectOwnerId, res.locals.user.id))
      )
      .returning();

    if (projectsObj.length === 0) {
      throw createHttpError(403, 'Project not found or you do not have permission to modify it');
    }

    sendApiResponse(res, 'Project updated');
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectsObj = await db
      .delete(projects)
      .where(
        and(eq(projects.id, +req.params.projectId), eq(projects.projectOwnerId, res.locals.user.id))
      )
      .returning();

    if (projectsObj.length === 0) {
      throw createHttpError(403, 'Project not found or you do not have permission to delete it');
    }

    sendApiResponse(res, 'Project deleted');
  } catch (error) {
    next(error);
  }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!(await checkProjectOwner(+req.params.projectId, res.locals.user.id))) {
      throw createHttpError(403, 'You do not have permission to add a user to this project');
    }

    if (+req.body.userId === res.locals.user.id) {
      throw createHttpError(409, 'You already own this project');
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
      throw createHttpError(403, 'You do not have permission to remove a user from this project');
    }

    const user = await db
      .delete(userOnProjects)
      .where(
        and(
          eq(userOnProjects.userId, +req.body.userId),
          eq(userOnProjects.projectId, +req.params.projectId)
        )
      )
      .returning();

    if (user.length === 0) {
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

const checkProjectMember = async (projectId: number, memberId: number) => {
  const isProjectMember = await db.query.userOnProjects.findFirst({
    where: and(eq(userOnProjects.userId, memberId), eq(userOnProjects.projectId, projectId)),
  });

  return isProjectMember;
};

export {
  getTasksForProject,
  getProjects,
  createTask,
  updateProject,
  deleteProject,
  addUser,
  removeUser,
};
