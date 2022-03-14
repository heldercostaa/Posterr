import { Router } from 'express';

import createPostController from '../modules/post/useCases/createPost';
import listFollowingPostsController from '../modules/post/useCases/listFollowingPosts';
import listPostsController from '../modules/post/useCases/listPosts';
import listSelfPostsController from '../modules/post/useCases/listSelfPosts';
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
  return listFollowingPostsController().handle(request, response);
});

postRouter.get('/self', (request, response) => {
  return listSelfPostsController().handle(request, response);
});
