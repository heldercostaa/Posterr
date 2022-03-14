import { UserRepository } from '@modules/account/repositories/typeorm/UserRepository';
import { PostRepository } from '@modules/post/repositories/typeorm/PostRepository';
import { QuotePostRepository } from '@modules/post/repositories/typeorm/QuotePostRepository';

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
