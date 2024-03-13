import { Server } from 'http';

import app from './app';
import prisma from './client';
import serverConfig from './config/serverConfig';
import logger from './config/logger';

let server: Server;

prisma.$connect().then(() => {
  logger.info('Connected to SQL Database');

  server = app.listen(serverConfig.port, () => {
    logger.info(`Listening to Port: ${serverConfig.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
