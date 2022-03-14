import { Router } from 'express';

import createPostController from '../modules/post/useCases/createPost';
import repostController from '../modules/post/useCases/repost';

export const postRouter = Router();

postRouter.post('/', (request, response) => {
  return createPostController().handle(request, response);
});

postRouter.post('/:id/repost', (request, response) => {
  return repostController().handle(request, response);
});
