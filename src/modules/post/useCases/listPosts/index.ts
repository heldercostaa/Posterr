import { PostRepository } from '@modules/post/repositories/typeorm/PostRepository';
import { QuotePostRepository } from '@modules/post/repositories/typeorm/QuotePostRepository';
import { RepostRepository } from '@modules/post/repositories/typeorm/RepostRepository';

import { ListPostsController } from './ListPostsController';
import { ListPostsUseCase } from './ListPostsUseCase';

export default (): ListPostsController => {
  const postRepository = new PostRepository();
  const repostRepository = new RepostRepository();
  const quotePostRepository = new QuotePostRepository();
  const listPostsUseCase = new ListPostsUseCase(
    postRepository,
    repostRepository,
    quotePostRepository
  );
  const createPostController = new ListPostsController(listPostsUseCase);

  return createPostController;
};
