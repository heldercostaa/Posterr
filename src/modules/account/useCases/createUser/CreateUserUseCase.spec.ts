import { InMemoryUserRepository } from '@modules/account/repositories/in-memory/InMemoryUserRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let inMemoryUserRepository: InMemoryUserRepository;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
  });

  it('should be able to create a new user', async () => {
    const username = 'cat';

    await createUserUseCase.execute({ username });

    const user = await inMemoryUserRepository.findBy({ username });

    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user', async () => {
    expect(async () => {
      const username = 'cat';

      await createUserUseCase.execute({ username });
      await createUserUseCase.execute({ username });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to have username longer than 14 characters', async () => {
    expect(async () => {
      const username = 'cattttttttttttt';

      await createUserUseCase.execute({ username });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to have username with special characters', async () => {
    expect(async () => {
      const username = '!cat';

      await createUserUseCase.execute({ username });
    }).rejects.toBeInstanceOf(AppError);

    expect(async () => {
      const username = 'ca t';

      await createUserUseCase.execute({ username });
    }).rejects.toBeInstanceOf(AppError);
  });
});
