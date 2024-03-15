import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import serverConfig from '../config/serverConfig';
import logger from '../config/logger';

const pool = new Pool({
  connectionString: serverConfig.data,
});

const dbClient = drizzle(pool);

const main = async () => {
  try {
    logger.info('Migration started..');
    await migrate(dbClient, { migrationsFolder: 'drizzle' });
    logger.info('Migration ended.');
    process.exit(0);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

main();
