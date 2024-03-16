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
  res.status(200).send(`
    <body style="background-color:black;">
      <h1 style="color:white;">🏥 Welcome to PH Health Care Server</h1>
    </body>
  `)
})


export default app;