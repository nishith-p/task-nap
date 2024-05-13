import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  taskTitle: z.string(),
  taskStatus: z.string(),
  taskCategory: z.string(),
  taskPriority: z.string(),
  taskCreatorId: z.object({
    profilePic: z.string().nullable(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  projectId: z.object({
    id: z.number(),
    projectName: z.string(),
    projectCategory: z.string(),
  }),
  createdAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
