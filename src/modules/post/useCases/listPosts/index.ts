import { PostRepository } from '../../repositories/implementations/PostRepository';
import { RepostRepository } from '../../repositories/implementations/RepostRepository';
import { ListPostsController } from './ListPostsController';
import { ListPostsUseCase } from './ListPostsUseCase';

export default (): ListPostsController => {
  const postRepository = new PostRepository();
  const repostRepository = new RepostRepository();
  const listPostsUseCase = new ListPostsUseCase(
    postRepository,
    repostRepository
  );
  const createPostController = new ListPostsController(listPostsUseCase);

  return createPostController;
};
