import { Response } from 'express';
import { isHttpError } from 'http-errors';

type ApiResponse<T> = {
  success: boolean;
  error: Error | string | unknown | null;
  data: T;
};

const sendApiResponse = <T>(res: Response<ApiResponse<T>>, data: T): void => {
  res.status(res.statusCode).json({ success: true, error: null, data });
};

const sendApiError = (res: Response<ApiResponse<null>>, error: unknown): void => {
  let statusCode = 500;
  let errorMessage = 'An unknown error occured.';

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  } else if (error instanceof TypeError) {
    statusCode = 400;
    errorMessage = error.message;
  } else {
    errorMessage = error instanceof Error ? error.message : String(error);
  }

  res.status(statusCode).json({ success: false, error: errorMessage, data: null });
};

export { sendApiResponse, sendApiError };
