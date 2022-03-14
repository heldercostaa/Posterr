import { AppError } from '@errors/AppError';
import { IUserRepository } from '@modules/account/repositories/IUserRepository';

interface IRequest {
  userWhoFollowsUsername: string;
  userBeingFollowedUsername: string;
}

export class FollowUserUseCase {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    userWhoFollowsUsername,
    userBeingFollowedUsername,
  }: IRequest): Promise<void> {
    if (userWhoFollowsUsername === userBeingFollowedUsername) {
      throw new AppError('Cannot follow yourself');
    }

    const userWhoFollows = await this.usersRepository.findBy({
      username: userWhoFollowsUsername,
      includeFollowing: true,
    });

    if (!userWhoFollows) {
      throw new AppError('Invalid user who follows');
    }

    const alreadyFollow = userWhoFollows.following.find(
      (u) => u.username === userBeingFollowedUsername
    );

    if (alreadyFollow) {
      throw new AppError('Already follow this user');
    }

    const userBeingFollowed = await this.usersRepository.findBy({
      username: userBeingFollowedUsername,
    });

    if (!userBeingFollowed) {
      throw new AppError('Invalid user being followed');
    }

    await this.usersRepository.follow({
      userWhoFollowsId: userWhoFollows.id,
      userBeingFollowedId: userBeingFollowed.id,
    });
  }
}
