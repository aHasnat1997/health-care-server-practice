import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { AllRoutes } from './routes';
import { globalErrorHandler } from './error/globalErrorHandler';

export class Rocket {
  private app: Express;

  constructor() {
    this.app = express();
  }

  start() {
    // express parsers
    this.app.use(express.json());
    this.app.use(cors());

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

  listen(port: any) {
    this.app.listen(port, () => console.info('Server 🔥 on port:', port))
  }
};

// const app = express();

// // express parsers
// app.use(express.json());
// app.use(cors());

// /**
//  * all api routes
//  */
// app.use('/api/v1', AllRoutes);

// /**
//  * Home route
//  */
// app.get('/', (req: Request, res: Response) => {
//   res.status(200).send(`
//     <body style="background-color:black;">
//       <h1 style="color:white;">🏥 Welcome to PH Health Care Server</h1>
//     </body>
//   `)
// })

// // global error handler
// app.use(globalErrorHandler)


// export default app;