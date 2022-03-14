import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { router } from '@shared/app/routes';
import createConnection from '@shared/database';
import { AppError } from '@shared/errors/AppError';

createConnection();
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

export { app };
