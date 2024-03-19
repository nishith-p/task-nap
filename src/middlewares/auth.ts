import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import { verifyJwt } from '../util/auth';
import serverConfig from '../config/serverConfig';

interface LoginRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      next();
      return;
    }

    const accessToken = authHeader.split(' ')[1];

    const validateAccessToken = await verifyJwt<{ user: { id: string } }>(
      accessToken,
      serverConfig.jwt.secret
    );

    if (!validateAccessToken) {
      throw createHttpError(403, 'Forbidden');
    }

    res.locals.user = validateAccessToken.user;

    next();
  } catch (error) {
    next(error);
  }
};

const authOptional = async (req: LoginRequest, res: Response, next: NextFunction) => {
  try {
    req.user = res.locals.user;

    next();
  } catch (error) {
    next(error);
  }
};

const authRequired = async (req: LoginRequest, res: Response, next: NextFunction) => {
  try {
    req.user = res.locals.user;

    if (!req.user) {
      throw createHttpError(401, 'Invalid or expired token');
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { authOptional, authRequired, deserializeUser };
