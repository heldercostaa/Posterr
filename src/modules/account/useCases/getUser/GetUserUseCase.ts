import { AppError } from '../../../../errors/AppError';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  username: string;
}

export class GetUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ username }: IRequest): Promise<User> {
    const user = await this.usersRepository.findBy({
      username,
      includeFollowers: true,
      includeFollowing: true,
      includePosts: true,
      includeReposts: true,
    });

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
