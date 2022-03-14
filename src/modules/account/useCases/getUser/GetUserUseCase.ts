import { AppError } from '../../../../errors/AppError';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  username: string;
}

export class GetUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ username }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByUsername({
      username,
      includeFollowers: true,
      includeFollowing: true,
    });

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}
