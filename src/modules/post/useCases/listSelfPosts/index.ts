import { UserRepository } from '../../../account/repositories/implementations/UserRepository';
import { PostRepository } from '../../repositories/implementations/PostRepository';
import { RepostRepository } from '../../repositories/implementations/RepostRepository';
import { ListSelfPostsController } from './ListSelfPostsController';
import { ListSelfPostsUseCase } from './ListSelfPostsUseCase';

export default (): ListSelfPostsController => {
  const postRepository = new PostRepository();
  const repostRepository = new RepostRepository();
  const userRepository = new UserRepository();
  const listSelfPostsUseCase = new ListSelfPostsUseCase(
    userRepository,
    postRepository,
    repostRepository
  );
  const listFollowingPostsController = new ListSelfPostsController(
    listSelfPostsUseCase
  );

  return listFollowingPostsController;
};
