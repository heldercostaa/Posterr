import { AppError } from '../../../../errors/AppError';
import { IUserRepository } from '../../../account/repositories/IUserRepository';
import { IPostRepository } from '../../repositories/IPostRepository';
import { IRepostRepository } from '../../repositories/IRepostRepository';

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
