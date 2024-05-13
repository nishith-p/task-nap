import { z } from "zod";

export const projectSchema = z.object({
  id: z.number(),
  projectName: z.string(),
  projectCategory: z.string(),
  projectStatus: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  projectCreator: z.object({
    id: z.number(),
    profilePic: z.string().nullable(),
    firstName: z.string(),
    lastName: z.string(),
  }),
});

export type Project = z.infer<typeof projectSchema>;
