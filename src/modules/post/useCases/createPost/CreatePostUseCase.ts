import { AppError } from '../../../../errors/AppError';
import { IUserRepository } from '../../../account/repositories/IUserRepository';
import { IPostRepository } from '../../repositories/IPostRepository';

interface IRequest {
  creatorUsername: string;
  message: string;
}

export class CreatePostUseCase {
  constructor(
    private postsRepository: IPostRepository,
    private usersRepository: IUserRepository
  ) {}

  async execute({ creatorUsername, message }: IRequest): Promise<void> {
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
      throw new AppError('User not found');
    }

    await this.postsRepository.create({
      userId: creator.id,
      message,
    });
  }
}
