import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IFindByDTO } from '../../dtos/IFindByDTO';
import { IFollowUserDTO } from '../../dtos/IFollowUserDTO';
import { IUnfollowUserDTO } from '../../dtos/IUnfollowUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ username }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ username });

    await this.repository.save(user);
  }

  async findBy({
    username,
    includeFollowers,
    includeFollowing,
    includePosts,
    includeReposts,
  }: IFindByDTO): Promise<User | null> {
    let userQuery = this.repository.createQueryBuilder('user');

    if (username) {
      userQuery = userQuery.andWhere('user.username = :username', { username });
    }

    if (includeFollowers) {
      userQuery = userQuery.leftJoinAndSelect('user.followers', 'followers');
    }

    if (includeFollowing) {
      userQuery = userQuery.leftJoinAndSelect('user.following', 'following');
    }

    if (includePosts) {
      userQuery = userQuery.leftJoinAndSelect('user.posts', 'posts');
    }

    if (includeReposts) {
      userQuery = userQuery.leftJoinAndSelect('user.reposts', 'reposts');
    }

    const user = await userQuery.getOne();

    return user || null;
  }

  async follow({
    userWhoFollowsId,
    userBeingFollowedId,
  }: IFollowUserDTO): Promise<void> {
    await this.repository.manager.query(
      `INSERT INTO "user_follow_user" ("user_who_follows_id", "user_being_followed_id") VALUES ($1, $2)`,
      [userWhoFollowsId, userBeingFollowedId]
    );
  }

  async unfollow({
    userWhoUnfollowsId,
    userBeingUnfollowedId,
  }: IUnfollowUserDTO): Promise<void> {
    await this.repository.manager.query(
      `DELETE FROM "user_follow_user" WHERE "user_who_follows_id" = $1 AND "user_being_followed_id" = $2`,
      [userWhoUnfollowsId, userBeingUnfollowedId]
    );
  }
}
