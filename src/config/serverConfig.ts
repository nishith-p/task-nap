import dotenv from 'dotenv';
import path from 'path';
import z from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().default('secret'),
  JWT_ACCESS_EXPIRATION_MINUTES: z.string(),
  JWT_REFRESH_EXPIRATION_DAYS: z.string(),
});

const envVars = envVarsSchema.safeParse(process.env);

if (!envVars.success) {
  console.error('Config validation error:', envVars.error.issues);
  process.exit(1);
}

export default {
  env: envVars.data.NODE_ENV,
  port: envVars.data.PORT,
  data: envVars.data.DATABASE_URL,
  jwt: {
    secret: envVars.data.JWT_SECRET,
    accessExpirationMinutes: envVars.data.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.data.JWT_REFRESH_EXPIRATION_DAYS,
  },
};
