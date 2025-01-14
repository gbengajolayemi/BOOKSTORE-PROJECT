import { createConnection } from 'mysql2/promise';
import { logger } from './logger';

const connectToDatabase = async () => {
  try {
    const connection = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    logger.info('Connected to the database');
    return connection;
  } catch (error) {
    logger.error('Database connection error', error);
    throw error;
  }
};

export { connectToDatabase };
