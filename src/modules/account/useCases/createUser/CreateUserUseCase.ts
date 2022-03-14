import { AppError } from '../../../../errors/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  username: string;
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ username }: IRequest): Promise<void> {
    if (username.length > 14) {
      throw new AppError('Username must be longer than 14 characters');
    }

    if (!username.match(/^[a-z0-9]+$/i)) {
      throw new AppError('Username must be alphanumeric only');
    }

    const userAlreadyExists = await this.usersRepository.findBy({
      username,
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    await this.usersRepository.create({ username });
  }
}
