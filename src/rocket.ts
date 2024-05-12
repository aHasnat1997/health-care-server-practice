import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { AllRoutes } from './routes';
import { globalErrorHandler } from './error/globalErrorHandler';
import config from './config';

export class Rocket {
  private app: Express;

  constructor() {
    this.app = express();
  }

  // express parsers
  load() {
    this.app.use(express.json());
    this.app.use(cors({ origin: config.Clint_URL, credentials: true }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  initiate() {
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

  launch(port: string) {
    this.app.listen(port, () => console.info(`🚀 Rocket launched on ${port} port`))
  }
};