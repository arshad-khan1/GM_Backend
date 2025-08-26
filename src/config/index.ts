import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DB_HOST, DB_PORT, DB_DATABASE, DB_URL } = process.env;
export const { HELPNEST_MESSAGING_HOST, HELPNEST_BACKEND_HOST, APPLICATION_CHANNEL_NAME } = process.env;
export const { PARTNERS_API_URL_V3, PARTNERS_TEST_API_URL_V3 } = process.env;
export const { REDIS_HOST, REDIS_USERNAME, REDIS_PORT, REDIS_PASSWORD, REDIS_URL } = process.env;
