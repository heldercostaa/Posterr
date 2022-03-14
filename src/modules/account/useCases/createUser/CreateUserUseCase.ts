import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ username }: ICreateUserDTO): Promise<void> {
    if (username.length > 14) {
      throw new AppError('Username must be longer than 14 characters');
    }

    if (!username.match(/^[a-z0-9]+$/i)) {
      throw new AppError('Username must be alphanumeric only');
    }

    const userAlreadyExists = await this.usersRepository.findByUsername({
      username,
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    await this.usersRepository.create({ username });
  }
}
