import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { AllRoutes } from './routes';
import { globalErrorHandler } from './error/globalErrorHandler';

export class Rocket {
  private app: Express;

  constructor() {
    this.app = express();
  }

  // express parsers
  private parsers() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  start() {
    this.parsers();

    /**
    * all api routes
    */
    this.app.use('/api/v1', AllRoutes);

    /**
     * Home route
     */
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).send(`
        <body style="background-color:black;">
          <h1 style="color:white;">🏥 Welcome to PH Health Care Server</h1>
        </body>
      `)
    })

    // global error handler
    this.app.use(globalErrorHandler)
  }

  launch(port: any) {
    this.app.listen(port, () => console.info('Server 🔥 on port:', port))
  }
};