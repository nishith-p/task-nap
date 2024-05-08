import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import createHttpError from 'http-errors';

const validate =
  (validator: z.AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      validator.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0];
        next(createHttpError(422, errorMessage.message));
      } else {
        next(createHttpError(500, 'Internal server error.'));
      }
    }
  };

export default validate;
