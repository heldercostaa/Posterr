import { InMemoryUserRepository } from '@modules/account/repositories/in-memory/InMemoryUserRepository';
import { AppError } from '@shared/errors/AppError';

import { FollowUserUseCase } from './FollowUserUseCase';

let followUserUseCase: FollowUserUseCase;
let inMemoryUserRepository: InMemoryUserRepository;

describe('Follow User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    followUserUseCase = new FollowUserUseCase(inMemoryUserRepository);
  });

  it('should be able to follow a user', async () => {
    const catUsername = 'cat';
    const dogUsername = 'dog';

    await inMemoryUserRepository.create({ username: catUsername });
    await inMemoryUserRepository.create({ username: dogUsername });

    await followUserUseCase.execute({
      userWhoFollowsUsername: catUsername,
      userBeingFollowedUsername: dogUsername,
    });

    const cat = await inMemoryUserRepository.findBy({ username: catUsername });
    const dog = await inMemoryUserRepository.findBy({ username: dogUsername });

    expect(cat?.following[0].username).toBe(dogUsername);
    expect(dog?.followers[0].username).toBe(catUsername);
  });

  it('should not be able to follow yourself', async () => {
    expect(async () => {
      const catUsername = 'cat';

      await inMemoryUserRepository.create({ username: catUsername });

      await followUserUseCase.execute({
        userWhoFollowsUsername: catUsername,
        userBeingFollowedUsername: catUsername,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to follow a non existing user', async () => {
    expect(async () => {
      const catUsername = 'cat';
      const nonExistingUsername = 'non_existing';

      await inMemoryUserRepository.create({ username: catUsername });

      await followUserUseCase.execute({
        userWhoFollowsUsername: catUsername,
        userBeingFollowedUsername: nonExistingUsername,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to follow from non existing user', async () => {
    expect(async () => {
      const nonExistingUsername = 'non_existing';
      const dogUsername = 'dog';

      await inMemoryUserRepository.create({ username: dogUsername });

      await followUserUseCase.execute({
        userWhoFollowsUsername: nonExistingUsername,
        userBeingFollowedUsername: dogUsername,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to follow a user twice', async () => {
    expect(async () => {
      const catUsername = 'cat';
      const dogUsername = 'dog';

      await inMemoryUserRepository.create({ username: catUsername });
      await inMemoryUserRepository.create({ username: dogUsername });

      await followUserUseCase.execute({
        userWhoFollowsUsername: catUsername,
        userBeingFollowedUsername: dogUsername,
      });

      await followUserUseCase.execute({
        userWhoFollowsUsername: catUsername,
        userBeingFollowedUsername: dogUsername,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
