import { InMemoryUserRepository } from '@modules/account/repositories/in-memory/InMemoryUserRepository';
import { AppError } from '@shared/errors/AppError';

import { UnfollowUserUseCase } from './UnfollowUserUseCase';

let unfollowUserUseCase: UnfollowUserUseCase;
let inMemoryUserRepository: InMemoryUserRepository;

describe('Unfollow User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    unfollowUserUseCase = new UnfollowUserUseCase(inMemoryUserRepository);
  });

  it('should be able to unfollow a user', async () => {
    const catUsername = 'cat';
    const dogUsername = 'dog';

    await inMemoryUserRepository.create({ username: catUsername });
    await inMemoryUserRepository.create({ username: dogUsername });

    let cat = await inMemoryUserRepository.findBy({ username: catUsername });
    let dog = await inMemoryUserRepository.findBy({ username: dogUsername });

    if (!cat || !dog) {
      throw new Error('cat or dog not defined');
    }

    await inMemoryUserRepository.follow({
      userWhoFollowsId: cat.id,
      userBeingFollowedId: dog.id,
    });

    expect(cat?.following.length).toBe(1);
    expect(dog?.followers.length).toBe(1);

    await unfollowUserUseCase.execute({
      userWhoUnfollowsUsername: catUsername,
      userBeingUnfollowedUsername: dogUsername,
    });

    cat = await inMemoryUserRepository.findBy({ username: catUsername });
    dog = await inMemoryUserRepository.findBy({ username: dogUsername });

    if (!cat || !dog) {
      throw new Error('cat or dog not defined');
    }

    expect(cat?.following.length).toBe(0);
    expect(dog?.followers.length).toBe(0);
  });

  it('should not be able to unfollow yourself', async () => {
    expect(async () => {
      const catUsername = 'cat';

      await inMemoryUserRepository.create({ username: catUsername });

      const cat = await inMemoryUserRepository.findBy({
        username: catUsername,
      });

      if (!cat) {
        throw new Error('cat not defined');
      }

      await unfollowUserUseCase.execute({
        userWhoUnfollowsUsername: catUsername,
        userBeingUnfollowedUsername: catUsername,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to unfollow a non existing user', async () => {
    expect(async () => {
      const catUsername = 'cat';
      const nonExistingUsername = 'non_existing';

      await inMemoryUserRepository.create({ username: catUsername });

      const cat = await inMemoryUserRepository.findBy({
        username: catUsername,
      });

      if (!cat) {
        throw new Error('cat not defined');
      }

      await unfollowUserUseCase.execute({
        userWhoUnfollowsUsername: catUsername,
        userBeingUnfollowedUsername: nonExistingUsername,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to unfollow from non existing user', async () => {
    expect(async () => {
      const nonExistingUsername = 'non_existing';
      const dogUsername = 'dog';

      await inMemoryUserRepository.create({ username: dogUsername });

      const dog = await inMemoryUserRepository.findBy({
        username: dogUsername,
      });

      if (!dog) {
        throw new Error('dog not defined');
      }

      await unfollowUserUseCase.execute({
        userWhoUnfollowsUsername: nonExistingUsername,
        userBeingUnfollowedUsername: dogUsername,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to unfollow a user if is not a follower', async () => {
    expect(async () => {
      const catUsername = 'cat';
      const dogUsername = 'dog';

      await inMemoryUserRepository.create({ username: catUsername });
      await inMemoryUserRepository.create({ username: dogUsername });

      const cat = await inMemoryUserRepository.findBy({
        username: catUsername,
      });
      const dog = await inMemoryUserRepository.findBy({
        username: dogUsername,
      });

      if (!cat || !dog) {
        throw new Error('cat or dog not defined');
      }

      await unfollowUserUseCase.execute({
        userWhoUnfollowsUsername: catUsername,
        userBeingUnfollowedUsername: dogUsername,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
