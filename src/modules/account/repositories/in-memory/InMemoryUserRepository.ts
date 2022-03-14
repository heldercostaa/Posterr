import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { IFindByDTO } from '@modules/account/dtos/IFindByDTO';
import { IFollowUserDTO } from '@modules/account/dtos/IFollowUserDTO';
import { IUnfollowUserDTO } from '@modules/account/dtos/IUnfollowUserDTO';
import { User } from '@modules/account/entities/User';

import { IUserRepository } from '../IUserRepository';

export class InMemoryUserRepository implements IUserRepository {
  users: User[] = [];

  async create({ username }: ICreateUserDTO): Promise<void> {
    const user = new User();
    user.followers = [];
    user.following = [];

    Object.assign(user, { username });

    this.users.push(user);
  }

  async findBy({ username }: IFindByDTO): Promise<User | null> {
    const user = this.users.find((u) => u.username === username);

    return user || null;
  }

  async follow({
    userWhoFollowsId,
    userBeingFollowedId,
  }: IFollowUserDTO): Promise<void> {
    const userWhoFollows = this.users.find((u) => u.id === userWhoFollowsId);
    const userBeingFollowed = this.users.find(
      (u) => u.id === userBeingFollowedId
    );

    if (!userWhoFollows || !userBeingFollowed) return;

    userWhoFollows.following.push(userBeingFollowed);
    userBeingFollowed.followers.push(userWhoFollows);
  }

  async unfollow({
    userWhoUnfollowsId,
    userBeingUnfollowedId,
  }: IUnfollowUserDTO): Promise<void> {
    const userWhoUnfollows = this.users.find(
      (u) => u.id === userWhoUnfollowsId
    );
    const userBeingUnfollowed = this.users.find(
      (u) => u.id === userBeingUnfollowedId
    );

    if (!userWhoUnfollows || !userBeingUnfollowed) return;

    userWhoUnfollows.following = userWhoUnfollows.following.filter(
      (u) => u.id !== userBeingUnfollowedId
    );

    userBeingUnfollowed.followers = userBeingUnfollowed.followers.filter(
      (u) => u.id !== userWhoUnfollowsId
    );
  }
}
