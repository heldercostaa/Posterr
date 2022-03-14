import { IUserRepository } from '@modules/account/repositories/IUserRepository';
import { IPostRepository } from '@modules/post/repositories/IPostRepository';
import { IQuotePostRepository } from '@modules/post/repositories/IQuotePostRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  message: string;
  creatorUsername: string;
  originalPostId: string;
}

export class CreateQuotePostUseCase {
  constructor(
    private postsRepository: IPostRepository,
    private repostRepository: IQuotePostRepository,
    private usersRepository: IUserRepository
  ) {}

  async execute({
    message,
    creatorUsername,
    originalPostId,
  }: IRequest): Promise<void> {
    if (message.trim().length === 0) {
      throw new AppError('Message must not be empty');
    }

    if (message.length > 777) {
      throw new AppError('Message must not exceed 777 characters');
    }

    const creator = await this.usersRepository.findBy({
      username: creatorUsername,
    });

    if (!creator) {
      throw new AppError('User nor found');
    }

    const originalPost = await this.postsRepository.findBy({
      id: originalPostId,
    });

    if (!originalPost) {
      throw new AppError('Original post not found');
    }

    await this.repostRepository.create({
      message,
      creatorId: creator.id,
      originalPostId,
    });
  }
}
