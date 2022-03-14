import { Router } from 'express';

import createPostController from '../modules/post/useCases/createPost';

export const postRouter = Router();

postRouter.post('/', (request, response) => {
  return createPostController().handle(request, response);
});
