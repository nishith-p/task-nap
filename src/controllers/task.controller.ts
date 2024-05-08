import { Response, Request, NextFunction } from 'express';
import { and, eq } from 'drizzle-orm';
import createHttpError from 'http-errors';

import { db } from '../db/connect';
import { projects, tasks, userOnProjects } from '../db/schema';
import { sendApiResponse } from '../util/response';

const getTasksForUser = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasksObj = await db.query.tasks.findMany({
      where: eq(tasks.taskAssigneeId, res.locals.user.id),
      columns: {
        id: true,
        taskTitle: true,
        taskStatus: true,
        taskCategory: true,
        taskPriority: true,
        taskCreatorId: true,
        createdAt: true,
      },
      with: {
        taskCreatorId: {
          columns: {
            profilePic: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    sendApiResponse(res, tasksObj);
  } catch (error) {
    next(error);
  }
};

const getTasksForProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isProjectOwner = await checkProjectOwner(+req.params.projectId, res.locals.user.id);
    const isProjectMember =
      !isProjectOwner && (await checkProjectMember(+req.params.projectId, res.locals.user.id));

    if (!isProjectMember && !isProjectOwner) {
      throw createHttpError(403, 'You do not have permission to view tasks of this project');
    }

    const tasksObj = await db.query.tasks.findMany({
      where: eq(tasks.projectId, +req.params.projectId),
      columns: {
        id: true,
        taskTitle: true,
        taskStatus: true,
        taskCategory: true,
        taskPriority: true,
        taskCreatorId: true,
        taskAssigneeId: true,
      },
      with: {
        taskCreatorId: {
          columns: {
            profilePic: true,
            firstName: true,
            lastName: true,
          },
        },
        taskAssigneeId: {
          columns: {
            profilePic: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    sendApiResponse(res, tasksObj);
  } catch (error) {
    next(error);
  }
};

const getTaskDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isProjectOwner = await checkProjectOwner(+req.params.projectId, res.locals.user.id);
    const isProjectMember =
      !isProjectOwner && (await checkProjectMember(+req.params.projectId, res.locals.user.id));

    if (!isProjectMember && !isProjectOwner) {
      throw createHttpError(403, 'You do not have permission to view details of this task');
    }

    const taskObj = await db.query.tasks.findFirst({
      where: and(eq(tasks.projectId, +req.params.projectId), eq(tasks.id, +req.params.taskId)),
      with: {
        taskCreatorId: {
          columns: {
            id: true,
            profilePic: true,
            firstName: true,
            lastName: true,
          },
        },
        taskAssigneeId: {
          columns: {
            id: true,
            profilePic: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!taskObj) {
      throw createHttpError(400, 'Task not found');
    }

    sendApiResponse(res, taskObj);
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

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isProjectOwner = await checkProjectOwner(+req.params.projectId, res.locals.user.id);
    const isProjectMember =
      !isProjectOwner && (await checkProjectMember(+req.params.projectId, res.locals.user.id));

    if (!isProjectMember && !isProjectOwner) {
      throw createHttpError(403, 'You do not have permission to modify this task');
    }

    const taskObj = await db
      .update(tasks)
      .set(req.body)
      .where(and(eq(tasks.projectId, +req.params.projectId), eq(tasks.id, +req.params.taskId)))
      .returning();

    if (taskObj.length === 0) {
      throw createHttpError(403, 'Task not found or you do not have permission to modify it');
    }

    sendApiResponse(res, 'Task updated');
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isProjectOwner = await checkProjectOwner(+req.params.projectId, res.locals.user.id);
    const isProjectMember =
      !isProjectOwner && (await checkProjectMember(+req.params.projectId, res.locals.user.id));

    if (!isProjectMember && !isProjectOwner) {
      throw createHttpError(403, 'You do not have permission to change status of this task');
    }

    const taskObj = await db
      .update(tasks)
      .set({ taskStatus: req.body.taskStatus })
      .where(and(eq(tasks.id, +req.params.taskId), eq(tasks.projectId, +req.params.projectId)))
      .returning();

    if (taskObj.length === 0) {
      throw createHttpError(403, 'Task not found or you do not have permission to modify it');
    }

    sendApiResponse(res, 'Task status updated');
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskObj = await db
      .delete(tasks)
      .where(and(eq(tasks.id, +req.params.taskId), eq(tasks.taskCreatorId, res.locals.user.id)))
      .returning();

    if (taskObj.length === 0) {
      throw createHttpError(403, 'Task not found or you do not have permission to delete it');
    }

    sendApiResponse(res, 'Task deleted');
  } catch (error) {
    next(error);
  }
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isProjectOwner = await checkProjectOwner(+req.params.projectId, res.locals.user.id);
    const isProjectMember =
      !isProjectOwner && (await checkProjectMember(+req.params.projectId, res.locals.user.id));

    if (!isProjectMember && !isProjectOwner) {
      throw createHttpError(403, 'You do not have permission to modify the task assignee');
    }

    if (req.body.userId !== null) {
      const isCurrentMember = await checkProjectMember(+req.params.projectId, req.body.userId);

      if (!isCurrentMember) {
        throw createHttpError(
          404,
          'The user you are trying to assign is not a member of this project'
        );
      }
    }

    const taskObj = await db
      .update(tasks)
      .set({ taskAssigneeId: req.body.userId })
      .where(and(eq(tasks.id, +req.params.taskId), eq(tasks.projectId, +req.params.projectId)))
      .returning();

    if (taskObj.length === 0) {
      throw createHttpError(403, 'Task not found or you do not have permission to assign users');
    }

    sendApiResponse(res, 'User assigned to task');
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
  getTasksForUser,
  getTasksForProject,
  getTaskDetails,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  addUser,
};
