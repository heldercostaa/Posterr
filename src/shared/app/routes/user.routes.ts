import { Router } from 'express';

import createUserController from '@modules/account/useCases/createUser';
import followUserController from '@modules/account/useCases/followUser';
import getUserController from '@modules/account/useCases/getUser';
import unfollowUserController from '@modules/account/useCases/unfollowUser';

export const userRoutes = Router();

userRoutes.post('/', (request, response) => {
  return createUserController().handle(request, response);
});

userRoutes.get('/:username', (request, response) => {
  return getUserController().handle(request, response);
});

userRoutes.post('/follow/:userBeingFollowedUsername', (request, response) => {
  return followUserController().handle(request, response);
});

userRoutes.post(
  '/unfollow/:userBeingUnfollowedUsername',
  (request, response) => {
    return unfollowUserController().handle(request, response);
  }
);
