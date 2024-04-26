import { relations } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  timestamp,
  pgEnum,
  real,
  integer,
  primaryKey,
} from 'drizzle-orm/pg-core';

//Enums
export const userRoleEnum = pgEnum('userRole', ['MEMBER', 'MANAGER', 'ADMIN']);
export const projectCategoryEnum = pgEnum('projectCategory', ['SOFTWARE', 'MARKETING', 'BUSINESS']);
export const projectStatusEnum = pgEnum('projectStatus', ['OPEN', 'CLOSE']);
export const taskCategoryEnum = pgEnum('taskCategory', ['BUG', 'CR', 'FR']);
export const taskStatusEnum = pgEnum('taskStatus', ['BACKLOG', 'SELECTED', 'INPROGRESS', 'DONE']);
export const taskPriorityEnum = pgEnum('taskPriority', ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);

//Tables
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  profilePic: text('profilePic'),
  role: userRoleEnum('userRole').default('MEMBER'),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow(),
  token: text('token'),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  projectName: text('projectName').notNull(),
  projectOwnerId: integer('projectOwnerId')
    .notNull()
    .references(() => users.id),
  projectDesc: text('projectDesc').notNull(),
  projectCategory: projectCategoryEnum('projectCategory').default('SOFTWARE'),
  projectStatus: projectStatusEnum('projectStatus').default('OPEN'),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  taskTitle: text('taskTitle').notNull(),
  taskDesc: text('taskDesc').notNull(),
  taskCategory: taskCategoryEnum('taskCategory').default('BUG'),
  taskStatus: taskStatusEnum('taskStatus').default('BACKLOG'),
  taskCreatorId: integer('taskCreatorId')
    .notNull()
    .references(() => users.id),
  taskAssigneeId: integer('taskAssigneeId')
    .notNull()
    .references(() => users.id),
  taskPriority: taskPriorityEnum('taskPriority').default('LOW'),
  taskEstimate: real('taskEstimate').notNull(),
  projectId: integer('projectId')
    .notNull()
    .references(() => projects.id),
  createdAt: timestamp('createdAt', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).defaultNow(),
});

export const userOnProjects = pgTable(
  'user_projects',
  {
    userId: integer('userId')
      .notNull()
      .references(() => users.id),
    projectId: integer('projectId')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.projectId] }),
    };
  }
);

/** Relations
 * User (1) - (n) Project (be owner)
 * User (n) - (m) Project (be member)
 * User (1) - (n) Task (be owner)
 * User (1) - (n) Task (be assigned)
 * Project (1) - (n) Task
 */
export const userRelations = relations(users, ({ many }) => ({
  projectsCreated: many(projects),
  projectsAssigned: many(projects),
  tasksAssigned: many(tasks),
  tasksCreated: many(tasks),
}));

export const projectRelations = relations(projects, ({ one, many }) => ({
  projectCreator: one(users, {
    fields: [projects.projectOwnerId],
    references: [users.id],
  }),
  usersAssinged: many(users),
  tasks: many(tasks),
}));

export const taskRelations = relations(tasks, ({ one }) => ({
  projectId: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  taskCreatorId: one(users, {
    fields: [tasks.taskCreatorId],
    references: [users.id],
  }),
  taskAssigneeId: one(users, {
    fields: [tasks.taskAssigneeId],
    references: [users.id],
  }),
}));

export const userOnProjectsRelations = relations(userOnProjects, ({ one }) => ({
  userId: one(users, {
    fields: [userOnProjects.userId],
    references: [users.id],
  }),
  projectId: one(projects, {
    fields: [userOnProjects.projectId],
    references: [projects.id],
  }),
}));
