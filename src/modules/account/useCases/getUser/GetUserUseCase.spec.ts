import { InMemoryUserRepository } from '@modules/account/repositories/in-memory/InMemoryUserRepository';
import { AppError } from '@shared/errors/AppError';

import { GetUserUseCase } from './GetUserUseCase';

let getUserUseCase: GetUserUseCase;
let inMemoryUserRepository: InMemoryUserRepository;

describe('Get User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    getUserUseCase = new GetUserUseCase(inMemoryUserRepository);
  });

  it('should be able to get user by username', async () => {
    const username = 'cat';

    await inMemoryUserRepository.create({ username });

    const user = await getUserUseCase.execute({ username });

    expect(user.username).toBe(username);
  });

  it('should not be able to get user if username does not exists', async () => {
    expect(async () => {
      const username = 'cat';

      await getUserUseCase.execute({ username });
    }).rejects.toBeInstanceOf(AppError);
  });
});
