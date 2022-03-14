import { UserRepository } from '@modules/account/repositories/typeorm/UserRepository';
import { PostRepository } from '@modules/post/repositories/typeorm/PostRepository';
import { RepostRepository } from '@modules/post/repositories/typeorm/RepostRepository';

import { RepostController } from './RepostController';
import { RepostUseCase } from './RepostUseCase';

export default (): RepostController => {
  const repostRepository = new RepostRepository();
  const postRepository = new PostRepository();
  const userRepository = new UserRepository();
  const repostUseCase = new RepostUseCase(
    postRepository,
    repostRepository,
    userRepository
  );
  const repostController = new RepostController(repostUseCase);

  return repostController;
};
