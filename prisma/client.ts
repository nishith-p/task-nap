import { PrismaClient } from '@prisma/client';
import serverConfig from '../src/config/serverConfig';

interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (serverConfig.env === 'development') {
  global.prisma = prisma;
}

export default prisma;
