import { z } from 'zod';

enum taskCategory {
  BUG,
  CR,
  FR,
}
enum taskStatus {
  BACKLOG,
  SELECTED,
  INPROGRESS,
  DONE,
}

enum taskPriority {
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
}

const createTaskSchema = z.object({
  body: z
    .object({
      taskTitle: z
        .string({
          required_error: 'Task title is required',
          invalid_type_error: 'Task title must be a string',
        })
        .min(3, { message: 'Number of characters cannot be less than 3' })
        .max(50, { message: 'Number of characters cannot be more than 50' }),
      taskDesc: z
        .string({
          required_error: 'Task description is required',
          invalid_type_error: 'Task description must be a string',
        })
        .min(6, { message: 'Number of characters cannot be less than 3' })
        .max(250, {
          message: 'Number of characters cannot be more than 250',
        }),
      taskCategory: z.nativeEnum(taskCategory),
      taskStatus: z.nativeEnum(taskStatus),
      taskPriority: z.nativeEnum(taskPriority),
      taskEstimate: z.number({
        required_error: 'Task estimate is required',
        invalid_type_error: 'Task estimate must be a number',
      }),
    })
    .strict(),
  params: z.object({
    projectId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
  }),
});

const updateTaskSchema = z.object({
  body: z
    .object({
      taskTitle: z
        .string({
          required_error: 'Task title is required',
          invalid_type_error: 'Task title must be a string',
        })
        .min(3, { message: 'Number of characters cannot be less than 3' })
        .max(50, { message: 'Number of characters cannot be more than 50' }),
      taskDesc: z
        .string({
          required_error: 'Task description is required',
          invalid_type_error: 'Task description must be a string',
        })
        .min(6, { message: 'Number of characters cannot be less than 3' })
        .max(250, {
          message: 'Number of characters cannot be more than 250',
        }),
      taskCategory: z.nativeEnum(taskCategory),
      taskPriority: z.nativeEnum(taskPriority),
      taskEstimate: z.number({
        required_error: 'Task estimate is required',
        invalid_type_error: 'Task estimate must be a number',
      }),
    })
    .strict(),
  params: z.object({
    projectId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
    taskId: z.string().regex(/^\d+$/, {
      message: 'Task ID must be a number',
    }),
  }),
});

const updateTaskStatusSchema = z.object({
  body: z
    .object({
      taskStatus: z.nativeEnum(taskStatus),
    })
    .strict(),
  params: z.object({
    projectId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
    taskId: z.string().regex(/^\d+$/, {
      message: 'Task ID must be a number',
    }),
  }),
});

const updateTaskAssigneeSchema = z.object({
  body: z
    .object({
      userId: z
        .number({
          required_error: 'User ID is required',
          invalid_type_error: 'User ID must be an integer',
        })
        .int()
        .nullable(),
    })
    .strict(),
  params: z.object({
    projectId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
    taskId: z.string().regex(/^\d+$/, {
      message: 'Task ID must be a number',
    }),
  }),
});

const deleteTaskSchema = z.object({
  params: z.object({
    taskId: z.string().regex(/^\d+$/, {
      message: 'Task ID must be a number',
    }),
  }),
});

const getTaskDetailsSchema = z.object({
  params: z.object({
    projectId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
    taskId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
  }),
});

const getTasksForProjectSchema = z.object({
  params: z.object({
    projectId: z.string().regex(/^\d+$/, {
      message: 'Project ID must be a number',
    }),
  }),
});

export {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
  updateTaskAssigneeSchema,
  deleteTaskSchema,
  getTaskDetailsSchema,
  getTasksForProjectSchema,
};
