import { UserRepository } from '../../../account/repositories/implementations/UserRepository';
import { PostRepository } from '../../repositories/implementations/PostRepository';
import { CreatePostController } from './CreatePostController';
import { CreatePostUseCase } from './CreatePostUseCase';

export default (): CreatePostController => {
  const postRepository = new PostRepository();
  const userRepository = new UserRepository();
  const createPostUseCase = new CreatePostUseCase(
    postRepository,
    userRepository
  );
  const createUserController = new CreatePostController(createPostUseCase);

  return createUserController;
};
