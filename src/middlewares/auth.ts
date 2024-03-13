import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import { verifyJwt } from '../util/auth';
import serverConfig from '../config/serverConfig';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw createHttpError(401, 'Unauthorized');
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

export { deserializeUser };
