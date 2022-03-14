import { AppError } from '../../../../errors/AppError';
import { IGetUserDTO } from '../../dtos/IGetUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

export class GetUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ username }: IGetUserDTO): Promise<User> {
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
