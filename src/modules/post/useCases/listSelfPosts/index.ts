import { UserRepository } from '../../../account/repositories/implementations/UserRepository';
import { PostRepository } from '../../repositories/implementations/PostRepository';
import { QuotePostRepository } from '../../repositories/implementations/QuotePostRepository';
import { RepostRepository } from '../../repositories/implementations/RepostRepository';
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
