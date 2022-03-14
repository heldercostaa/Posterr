import { UserRepository } from '@modules/account/repositories/typeorm/UserRepository';
import { PostRepository } from '@modules/post/repositories/typeorm/PostRepository';
import { QuotePostRepository } from '@modules/post/repositories/typeorm/QuotePostRepository';
import { RepostRepository } from '@modules/post/repositories/typeorm/RepostRepository';

import { ListFollowingPostsController } from './ListFollowingPostsController';
import { ListFollowingPostsUseCase } from './ListFollowingPostsUseCase';

export default (): ListFollowingPostsController => {
  const postRepository = new PostRepository();
  const repostRepository = new RepostRepository();
  const userRepository = new UserRepository();
  const quotePostRepository = new QuotePostRepository();
  const listFollowingPostsUseCase = new ListFollowingPostsUseCase(
    userRepository,
    postRepository,
    repostRepository,
    quotePostRepository
  );
  const listFollowingPostsController = new ListFollowingPostsController(
    listFollowingPostsUseCase
  );

  return listFollowingPostsController;
};
