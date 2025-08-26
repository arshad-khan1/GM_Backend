// redisClient.js
import Redis from 'ioredis';
import { logger } from '@/utils/logger';
import { REDIS_URL } from '@config';
import { Queue } from 'bullmq';

const options = {
  // Your Redis connection options
  maxRetriesPerRequest: null, // Set maxRetriesPerRequest to null
  enableOfflineQueue: true, // Enable offline queue for handling commands while disconnected
  enableReadyCheck: false,
  maxClient: 100,
};

const IORedis = new Redis(REDIS_URL, options);

IORedis.on('error', err => logger.error('Redis Client Error', err));
IORedis.on('connect', () => {
  logger.info('Connected to IORedis');
});

const createQueue = async () => {
  const queue = new Queue('connector_CDC', { connection: IORedis });

  return { queue };
};

export default IORedis;
export { createQueue };
