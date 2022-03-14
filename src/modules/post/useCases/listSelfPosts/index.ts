import { UserRepository } from '@modules/account/repositories/typeorm/UserRepository';
import { PostRepository } from '@modules/post/repositories/typeorm/PostRepository';
import { QuotePostRepository } from '@modules/post/repositories/typeorm/QuotePostRepository';
import { RepostRepository } from '@modules/post/repositories/typeorm/RepostRepository';

import { ListSelfPostsController } from './ListSelfPostsController';
import { ListSelfPostsUseCase } from './ListSelfPostsUseCase';

export default (): ListSelfPostsController => {
  const postRepository = new PostRepository();
  const repostRepository = new RepostRepository();
  const userRepository = new UserRepository();
  const quotePostRepository = new QuotePostRepository();
  const listSelfPostsUseCase = new ListSelfPostsUseCase(
    userRepository,
    postRepository,
    repostRepository,
    quotePostRepository
  );
  const listFollowingPostsController = new ListSelfPostsController(
    listSelfPostsUseCase
  );

  return listFollowingPostsController;
};
