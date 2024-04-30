import { z } from 'zod';

enum projectCategory {
  SOFTWARE,
  MARKETING,
  BUSINESS,
}
enum projectStatus {
  OPEN,
  CLOSE,
}

const createProjectSchema = z.object({
  body: z
    .object({
      projectName: z
        .string({
          required_error: 'Project name is required',
          invalid_type_error: 'Project name must be a string',
        })
        .min(3, { message: 'Number of characters cannot be less than 3' })
        .max(50, { message: 'Number of characters cannot be more than 50' }),
      projectDesc: z
        .string({
          required_error: 'Project description is required',
          invalid_type_error: 'Project description must be a string',
        })
        .min(6, { message: 'Number of characters cannot be less than 3' })
        .max(250, {
          message: 'Number of characters cannot be more than 250',
        }),
      projectCategory: z.nativeEnum(projectCategory),
      projectStatus: z.nativeEnum(projectStatus),
    })
    .strict(),
});

const updateProjectSchema = z.object({
  body: z
    .object({
      projectName: z
        .string({
          required_error: 'Project name is required',
          invalid_type_error: 'Project name must be a string',
        })
        .min(3, { message: 'Number of characters cannot be less than 3' })
        .max(50, { message: 'Number of characters cannot be more than 50' }),
      projectDesc: z
        .string({
          required_error: 'Project description is required',
          invalid_type_error: 'Project description must be a string',
        })
        .min(6, { message: 'Number of characters cannot be less than 3' })
        .max(250, {
          message: 'Number of characters cannot be more than 250',
        }),
      projectCategory: z.nativeEnum(projectCategory),
      projectStatus: z.nativeEnum(projectStatus),
    })
    .strict(),
  params: z.object({
    projectId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
  }),
});

const deleteProjectSchema = z.object({
  params: z.object({
    projectId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
  }),
});

const getProjectSchema = z.object({
  params: z.object({
    projectId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
  }),
});

const getUserProjectsSchema = z.object({
  params: z.object({
    userId: z.string().regex(/^\d+$/, {
      message: 'User ID must be a number',
    }),
  }),
});

const addOrRemoveUserSchema = z.object({
  body: z
    .object({
      userId: z.number({
        required_error: 'User ID is required',
        invalid_type_error: 'User ID must be a number',
      }),
    })
    .strict(),
  params: z.object({
    projectId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
  }),
});

export {
  createProjectSchema,
  updateProjectSchema,
  deleteProjectSchema,
  getProjectSchema,
  getUserProjectsSchema,
  addOrRemoveUserSchema,
};
