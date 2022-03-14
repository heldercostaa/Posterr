import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { AppError } from '@errors/AppError';

import { router } from './routes';

import './database';

const app = express();
app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
});

const port = 3333;
app.listen(port, () => console.log(`✔ Server started on port ${port}!`));
