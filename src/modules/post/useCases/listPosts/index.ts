import { PostRepository } from '../../repositories/implementations/PostRepository';
import { QuotePostRepository } from '../../repositories/implementations/QuotePostRepository';
import { RepostRepository } from '../../repositories/implementations/RepostRepository';
import { ListPostsController } from './ListPostsController';
import { ListPostsUseCase } from './ListPostsUseCase';

export default (): ListPostsController => {
  const postRepository = new PostRepository();
  const repostRepository = new RepostRepository();
  const quotePostRepository = new QuotePostRepository();
  const listPostsUseCase = new ListPostsUseCase(
    postRepository,
    repostRepository,
    quotePostRepository
  );
  const createPostController = new ListPostsController(listPostsUseCase);

  return createPostController;
};
