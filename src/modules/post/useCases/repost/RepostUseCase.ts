import { IUserRepository } from '@modules/account/repositories/IUserRepository';
import { IPostRepository } from '@modules/post/repositories/IPostRepository';
import { IRepostRepository } from '@modules/post/repositories/IRepostRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  creatorUsername: string;
  originalPostId: string;
}

export class RepostUseCase {
  constructor(
    private postsRepository: IPostRepository,
    private repostRepository: IRepostRepository,
    private usersRepository: IUserRepository
  ) {}

  async execute({ creatorUsername, originalPostId }: IRequest): Promise<void> {
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

    const repostExists = await this.repostRepository.findBy({
      originalPostId,
      creatorId: creator.id,
    });

    if (repostExists) {
      throw new AppError('User already has reposted');
    }

    await this.repostRepository.create({
      creatorId: creator.id,
      originalPostId,
    });
  }
}
