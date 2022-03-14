import { UserRepository } from '../../../account/repositories/implementations/UserRepository';
import { PostRepository } from '../../repositories/implementations/PostRepository';
import { RepostRepository } from '../../repositories/implementations/RepostRepository';
import { ListFollowingPostsController } from './ListFollowingPostsController';
import { ListFollowingPostsUseCase } from './ListFollowingPostsUseCase';

export default (): ListFollowingPostsController => {
  const postRepository = new PostRepository();
  const repostRepository = new RepostRepository();
  const userRepository = new UserRepository();
  const createPostUseCase = new ListFollowingPostsUseCase(
    userRepository,
    postRepository,
    repostRepository
  );
  const listFollowingPostsController = new ListFollowingPostsController(
    createPostUseCase
  );

  return listFollowingPostsController;
};
