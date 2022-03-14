import {
  ICreateUserDTO,
  IUserRepository,
} from '../../repositories/IUserRepository';

export class CreateUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ username }: ICreateUserDTO): Promise<void> {
    if (username.length > 14) {
      throw new Error('Username must be longer than 14 characters');
    }

    if (!username.match(/^[a-z0-9]+$/i)) {
      throw new Error('Username must be alphanumeric only');
    }

    const userAlreadyExists = await this.usersRepository.findByUsername(
      username
    );

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    await this.usersRepository.create({ username });
  }
}
