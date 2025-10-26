import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import patientRoutes from './routes/patients.ts';

// EXPORT this function
export function createServer(): Application {
  // Load environment variables
  dotenv.config();

  const app: Application = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/patients', patientRoutes);

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'Server is running' });
  });

  // Return the configured app instance
  return app;
}

/* DELETE the app.listen() from this file.
  The server will be started by node-build.ts in production,
  or by a new dev-server.ts file in development.
*/