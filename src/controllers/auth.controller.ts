import { Response, Request, NextFunction } from 'express';
import createHttpError from 'http-errors';

import { sendApiResponse } from '../util/response';
import { hashPassword, matchPassword } from '../util/encryption';
import { signToken, verifyJwt } from '../util/auth';
import prisma from '../../prisma/client';
import logger from '../config/logger';
import serverConfig from '../config/serverConfig';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, ...rest } = req.body;

  try {
    if (await prisma.user.findUnique({ where: { email } })) {
      throw createHttpError(409, 'User already exists');
    }

    await prisma.user.create({
      data: {
        email,
        password: await hashPassword(password),
        ...rest,
      },
    });

    sendApiResponse(res, 'User created');
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let userObj;

  try {
    userObj = await prisma.user.findUnique({ where: { email } });

    if (!userObj || !(await matchPassword(password, userObj.password))) {
      throw createHttpError(404, 'Email or Password is incorrect');
    }

    const tokenUserObj = {
      user: {
        id: userObj.id,
        email: userObj.email,
      },
    };

    const { accessToken, refreshToken } = await signToken(tokenUserObj);

    if (!accessToken || !refreshToken) {
      throw createHttpError(500, 'Error occured while creating the tokens');
    }

    await prisma.user.update({
      where: {
        id: userObj.id,
      },
      data: {
        token: refreshToken,
      },
    });

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

    userObj = await prisma.user.findFirst({
      where: { token: cookies?.refresh_token },
    });

    if (!userObj) {
      res.clearCookie('refresh_token', { httpOnly: true });
      throw createHttpError(204, 'No content');
    }

    await prisma.user.update({
      where: {
        id: userObj.id,
      },
      data: {
        token: '',
      },
    });

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

    const userObj = await prisma.user.findFirst({
      where: { token: refreshToken },
    });

    if (!userObj) {
      throw createHttpError(403);
    }

    const tokenUserObj = {
      user: {
        id: userObj.id,
        email: userObj.email,
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
