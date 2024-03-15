import { pgTable, serial, text, uuid, timestamp, pgEnum, real } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('userRole', ['MEMBER', 'MANAGER', 'ADMIN']);
export const projectCategoryEnum = pgEnum('projectCategory', ['SOFTWARE', 'MARKETING', 'BUSINESS']);
export const projectStatusEnum = pgEnum('projectStatus', ['OPEN', 'CLOSE']);
export const taskCategoryEnum = pgEnum('taskCategory', ['BUG', 'CR', 'FR']);
export const taskStatusEnum = pgEnum('taskStatus', ['BACKLOG', 'SELECTED', 'INPROGRESS', 'DONE']);
export const taskPriorityEnum = pgEnum('taskPriority', ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  userExternalId: serial('userExternalId'),
  email: text('email').notNull(),
  password: text('password').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  profilePic: text('profilePic'),
  role: userRoleEnum('userRole').default('MEMBER'),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow(),
  //   projectsCreated:
  //   projectsAssigned:
  //   tasksCreated:
  //   tasksAssigned:
  token: text('token'),
});

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey(),
  projectExternalId: serial('projectExternalId'),
  projectName: text('projectName').notNull(),
  // projectOwner
  // projectOwnerId
  projectDesc: text('projectDesc').notNull(),
  projectCategory: projectCategoryEnum('projectCategory').default('SOFTWARE'),
  projectStatus: projectStatusEnum('projectStatus').default('OPEN'),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow(),
  // tasks
  // projectMembers
});

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey(),
  taskExternalId: serial('taskExternalId'),
  taskTitle: text('taskTitle').notNull(),
  taskDesc: text('taskDesc').notNull(),
  taskCategory: taskCategoryEnum('taskCategory').default('BUG'),
  taskStatus: taskStatusEnum('taskStatus').default('BACKLOG'),
  // taskCreator
  // taskCreatorId
  // taskAssignee
  // taskAssigneeId
  taskPriority: taskPriorityEnum('taskPriority').default('LOW'),
  taskEstimate: real('taskEstimate').notNull(),
  // project
  // projectId
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow(),
});
