import { IUserRepository } from '@modules/account/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  userWhoUnfollowsUsername: string;
  userBeingUnfollowedUsername: string;
}

export class UnfollowUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    userWhoUnfollowsUsername,
    userBeingUnfollowedUsername,
  }: IRequest): Promise<void> {
    if (userWhoUnfollowsUsername === userBeingUnfollowedUsername) {
      throw new AppError('Cannot unfollow yourself');
    }

    const userWhoUnfollows = await this.usersRepository.findBy({
      username: userWhoUnfollowsUsername,
      includeFollowing: true,
    });

    if (!userWhoUnfollows) {
      throw new AppError('Invalid user who unfollows');
    }

    const userBeingUnfollowed = await this.usersRepository.findBy({
      username: userBeingUnfollowedUsername,
    });

    if (!userBeingUnfollowed) {
      throw new AppError('Invalid user being unfollowed');
    }

    const followsUser = userWhoUnfollows.following.find(
      (u) => u.username === userBeingUnfollowedUsername
    );

    if (!followsUser) {
      throw new AppError('Already do not follow this user');
    }

    await this.usersRepository.unfollow({
      userWhoUnfollowsId: userWhoUnfollows.id,
      userBeingUnfollowedId: userBeingUnfollowed.id,
    });
  }
}
