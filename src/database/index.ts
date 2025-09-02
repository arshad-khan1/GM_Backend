import { connect, set } from 'mongoose';
import { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE, DB_URL } from '@config';

export const dbConnection = async () => {
  const dbConfig = {
    url: `${DB_URL}`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };

  if (NODE_ENV !== 'production') {
    set('debug', true);
  }
  try {
    if (!dbConfig.url) {
      throw new Error('DB_URL is not defined. Check your environment variables.');
    }
    await connect(dbConfig.url, dbConfig.options);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[DB_CONNECTION_ERROR]', err);
    throw err;
  }
};
