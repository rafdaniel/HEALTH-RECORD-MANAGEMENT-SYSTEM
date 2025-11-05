import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database/connection';
import { RowDataPacket } from 'mysql2';

// Import routes
import authRoutes from './routes/auth';
import patientRoutes from './routes/patients';

export function createServer(): Application {
  // Load environment variables
  dotenv.config();

  const app: Application = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Log all requests for debugging
  app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
  });

  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/patients', patientRoutes);

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'Server is running' });
  });

  // TEST ENDPOINT: Check if user exists in database
  app.get('/api/test/user/:email', async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      console.log('🔍 Testing database for user:', email);
      
      const [users] = await db.query<RowDataPacket[]>(
        'SELECT user_id, email, full_name, password_hash FROM users WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return res.json({
          success: false,
          message: 'User not found in database',
          email: email,
          hint: 'Create a user via POST /api/auth/signup'
        });
      }

      const user = users[0];
      return res.json({
        success: true,
        message: 'User found in database!',
        user: {
          user_id: user.user_id,
          email: user.email,
          full_name: user.full_name,
          password_hash_preview: user.password_hash.substring(0, 30) + '...',
          password_hash_starts_with: user.password_hash.substring(0, 4)
        }
      });
    } catch (error) {
      console.error('❌ Database test error:', error);
      res.status(500).json({
        success: false,
        message: 'Database error',
        error: String(error)
      });
    }
  });

  // TEST ENDPOINT: List all users (for debugging)
  app.get('/api/test/users', async (req: Request, res: Response) => {
    try {
      const [users] = await db.query<RowDataPacket[]>(
        'SELECT user_id, email, full_name FROM users LIMIT 10'
      );

      res.json({
        success: true,
        count: users.length,
        users: users
      });
    } catch (error) {
      console.error('❌ Database error:', error);
      res.status(500).json({
        success: false,
        message: 'Database error',
        error: String(error)
      });
    }
  });

  // Return the configured app instance
  return app;
}