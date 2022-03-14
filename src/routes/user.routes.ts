import { Router } from 'express';

import createUserController from '../modules/account/useCases/createUser';

export const userRoutes = Router();

userRoutes.post('/', (request, response) => {
  return createUserController().handle(request, response);
});
