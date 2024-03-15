import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

import serverConfig from '../config/serverConfig';
import logger from '../config/logger';

import * as schema from './schema';

const pgClient = new Client({
  connectionString: serverConfig.data,
});

pgClient.connect().then(() => {
  logger.info('Connected to SQL Database');
});

export const db = drizzle(pgClient, { schema: schema });
