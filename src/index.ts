import express from 'express';
import dotenv from 'dotenv'; // Import dotenv to load environment variables
import { logger } from './utils/logger';
import bookRoutes from './routes/bookRoutes';
import categoryRoutes from './routes/categoryRoutes';
import authorRoutes from './routes/authorRoutes';
import authRoutes from './routes/authRoutes';
import { authenticateToken } from './middleware/authMiddleware';
import { connectToDatabase } from './utils/database';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Use PORT from environment or default to 3001

app.use(express.json());

// Public routes
app.use('/api', authRoutes);
app.get('/api/test', (req, res) => {
  res.send('Test route is working!');
});

// Protected routes
app.use('/api/books', authenticateToken, bookRoutes);
app.use('/api/authors', authenticateToken, authorRoutes);
app.use('/api/categories', authenticateToken, categoryRoutes);

// Establish database connection and start the server
connectToDatabase()
  .then((connection: any) => {
    app.locals.db = connection;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    logger.error('Failed to connect to the database', error);
  });

export default app;
