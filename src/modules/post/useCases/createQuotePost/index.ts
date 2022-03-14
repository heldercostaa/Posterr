import { UserRepository } from '../../../account/repositories/implementations/UserRepository';
import { PostRepository } from '../../repositories/implementations/PostRepository';
import { QuotePostRepository } from '../../repositories/implementations/QuotePostRepository';
import { CreateQuotePostController } from './CreateQuotePostController';
import { CreateQuotePostUseCase } from './CreateQuotePostUseCase';

export default (): CreateQuotePostController => {
  const quotePostRepository = new QuotePostRepository();
  const postRepository = new PostRepository();
  const userRepository = new UserRepository();
  const createQuoteUseCase = new CreateQuotePostUseCase(
    postRepository,
    quotePostRepository,
    userRepository
  );
  const repostController = new CreateQuotePostController(createQuoteUseCase);

  return repostController;
};
