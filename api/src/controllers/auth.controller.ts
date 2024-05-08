import { Response, Request, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import createHttpError from 'http-errors';

import { sendApiResponse } from '../util/response';
import { hashPassword, matchPassword } from '../util/encryption';
import { signToken, verifyJwt } from '../util/auth';
import { db } from '../db/connect';
import { users } from '../db/schema';
import logger from '../config/logger';
import serverConfig from '../config/serverConfig';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, ...rest } = req.body;

  try {
    if (await db.query.users.findFirst({ where: eq(users.email, email) })) {
      throw createHttpError(409, 'User already exists');
    }

    await db.insert(users).values({ email, password: await hashPassword(password), ...rest });

    sendApiResponse(res, 'User created');
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let userObj;

  try {
    userObj = await db.query.users.findFirst({ where: eq(users.email, email) });

    if (!userObj || !(await matchPassword(password, userObj.password))) {
      throw createHttpError(404, 'Email or Password is incorrect');
    }

    const tokenUserObj = {
      user: {
        id: userObj.id,
        email: userObj.email,
        role: userObj.role,
      },
    };

    const { accessToken, refreshToken } = await signToken(tokenUserObj);

    if (!accessToken || !refreshToken) {
      throw createHttpError(500, 'Error occured while creating the tokens');
    }

    await db.update(users).set({ token: refreshToken }).where(eq(users.id, userObj.id));

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const responseObj = {
      user: tokenUserObj.user,
      accessToken,
    };

    sendApiResponse(res, responseObj);
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;

  let userObj;

  try {
    if (!cookies?.refresh_token) {
      throw createHttpError(204, 'No content');
    }

    userObj = await db.query.users.findFirst({ where: eq(users.token, cookies?.refresh_token) });

    if (!userObj) {
      res.clearCookie('refresh_token', { httpOnly: true });
      throw createHttpError(204, 'No content');
    }

    await db.update(users).set({ token: '' }).where(eq(users.id, userObj.id));

    res.clearCookie('refresh_token', { httpOnly: true }); //secure: true

    sendApiResponse(res, 'Successfully logged out');
  } catch (error) {
    next(error);
  }
};

const refreshAuth = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies?.refresh_token;

  res.clearCookie('refresh_token', { httpOnly: true });

  try {
    const tokenData = await verifyJwt(refreshToken, serverConfig.jwt.secret);

    if (!tokenData) {
      throw createHttpError(403);
    }

    const userObj = await db.query.users.findFirst({ where: eq(users.token, refreshToken) });

    if (!userObj) {
      throw createHttpError(403);
    }

    const tokenUserObj = {
      user: {
        id: userObj.id,
        email: userObj.email,
        role: userObj.role,
      },
    };

    const { accessToken } = await signToken(tokenUserObj);

    sendApiResponse(res, { accessToken });
  } catch (error) {
    next(error);
  }
};

const testProtected = (_req: Request, res: Response, next: NextFunction) => {
  try {
    logger.debug('Test Route Called!');
    sendApiResponse(res, res.locals.user);
  } catch (error) {
    next(error);
  }
};

export { createUser, loginUser, logoutUser, refreshAuth, testProtected };
