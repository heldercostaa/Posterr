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
    const creator = await this.usersRepository.findByUsername({
      username: creatorUsername,
    });

    if (!creator) {
      throw new AppError('User not found');
    }

    await this.postsRepository.create({ userId: creator.id, message });
  }
}
