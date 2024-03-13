import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import createHttpError from 'http-errors';
import cookieParser from 'cookie-parser';

import serverConfig from './config/serverConfig';
import morgan from './config/morgan';
import { sendApiError } from './util/response';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

if (serverConfig.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

import apiRouter from './routes/api';

app.use('/api', apiRouter);

app.use((_req, _res, next) => {
  next(createHttpError(404, 'Not found'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  sendApiError(res, error);
});

export default app;
