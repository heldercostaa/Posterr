import { UserRepository } from '../../../account/repositories/typeorm/UserRepository';
import { PostRepository } from '../../repositories/typeorm/PostRepository';
import { CreatePostController } from './CreatePostController';
import { CreatePostUseCase } from './CreatePostUseCase';

export default (): CreatePostController => {
  const postRepository = new PostRepository();
  const userRepository = new UserRepository();
  const createPostUseCase = new CreatePostUseCase(
    postRepository,
    userRepository
  );
  const createPostController = new CreatePostController(createPostUseCase);

  return createPostController;
};
