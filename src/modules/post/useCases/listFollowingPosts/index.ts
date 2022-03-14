import { UserRepository } from '../../../account/repositories/typeorm/UserRepository';
import { PostRepository } from '../../repositories/typeorm/PostRepository';
import { QuotePostRepository } from '../../repositories/typeorm/QuotePostRepository';
import { RepostRepository } from '../../repositories/typeorm/RepostRepository';
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
