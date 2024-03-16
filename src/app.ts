import express, { Request, Response } from 'express';
import cors from 'cors';
import { AllRoutes } from './routes';

const app = express();

// express parsers
app.use(express.json());
app.use(cors());

/**
 * all api routes
 */
app.use('/api/v1', AllRoutes);

/**
 * Home route
 */
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World...'
  });
})


export default app;