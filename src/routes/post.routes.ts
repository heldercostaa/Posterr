import { Router } from 'express';

import createPostController from '../modules/post/useCases/createPost';
import listFollowersController from '../modules/post/useCases/listFollowingPosts';
import listPostsController from '../modules/post/useCases/listPosts';
import repostController from '../modules/post/useCases/repost';

export const postRouter = Router();

postRouter.post('/', (request, response) => {
  return createPostController().handle(request, response);
});

postRouter.post('/:id/repost', (request, response) => {
  return repostController().handle(request, response);
});

postRouter.get('/', (request, response) => {
  return listPostsController().handle(request, response);
});

postRouter.get('/following', (request, response) => {
  return listFollowersController().handle(request, response);
});
