import { z } from 'zod';

const createUserSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email()
        .max(30, { message: 'Number of characters cannot be more than 30' }),
      password: z
        .string({
          required_error: 'Password is required',
          invalid_type_error: 'Password must be a string',
        })
        .min(6, { message: 'Number of characters cannot be less than 6' })
        .max(1024, {
          message: 'Number of characters cannot be more than 1024',
        }),
      firstName: z
        .string({
          required_error: 'First name is required',
          invalid_type_error: 'First name must be a string',
        })
        .max(30, { message: 'Number of characters cannot be more than 30' }),
      lastName: z
        .string({
          required_error: 'Last name is required',
          invalid_type_error: 'Last name must be a string',
        })
        .max(30, { message: 'Number of characters cannot be more than 30' }),
      profilePic: z.string({ invalid_type_error: 'Image must be in a string format' }).optional(),
    })
    .strict(),
});

const loginUserSchema = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: 'Email is required',
          invalid_type_error: 'Email must be a string',
        })
        .email()
        .max(30, { message: 'Number of characters cannot be more than 30.' }),
      password: z
        .string({
          required_error: 'Password is required.',
          invalid_type_error: 'Password must be a string',
        })
        .min(6, { message: 'Number of characters cannot be less than 6.' })
        .max(1024, {
          message: 'Number of characters cannot be more than 1024.',
        }),
    })
    .strict(),
});

export { createUserSchema, loginUserSchema };
