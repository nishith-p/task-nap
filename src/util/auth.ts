import jsonwebtoken, { SignOptions } from 'jsonwebtoken';

import serverConfig from '../config/serverConfig';
import logger from '../config/logger';

type UserTokenObj = {
  user: {
    id: number;
    email: string;
    role: 'MEMBER' | 'MANAGER' | 'ADMIN' | null;
  };
};

const signToken = async (userObj: UserTokenObj) => {
  const accessToken = await generateJwt(userObj, serverConfig.jwt.secret, {
    expiresIn: `${serverConfig.jwt.accessExpirationMinutes}m`,
  });

  const refreshToken = await generateJwt(userObj, serverConfig.jwt.secret, {
    expiresIn: `${serverConfig.jwt.refreshExpirationDays}d`,
  });

  return { accessToken, refreshToken };
};

const verifyJwt = <T>(token: string | null, key: string): T | null => {
  try {
    if (token) {
      return jsonwebtoken.verify(token, key) as T;
    } else {
      return null;
    }
  } catch (error) {
    logger.debug(error);
    return null;
  }
};

const generateJwt = async (payload: UserTokenObj, key: string, options: SignOptions = {}) => {
  return jsonwebtoken.sign(payload, key, {
    ...(options && options),
    algorithm: 'HS256',
  });
};

export { signToken, verifyJwt, generateJwt };
