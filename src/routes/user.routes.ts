import { Router } from 'express';

import createUserController from '../modules/account/useCases/createUser';
import getUserController from '../modules/account/useCases/getUser';

export const userRoutes = Router();

userRoutes.post('/', (request, response) => {
  return createUserController().handle(request, response);
});

userRoutes.get('/:username', (request, response) => {
  return getUserController().handle(request, response);
});
