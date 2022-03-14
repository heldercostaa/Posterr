import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IFindByUsernameDTO } from '../../dtos/IFindByUsernameDTO';
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

  async findByUsername({
    username,
    includeFollowers = false,
    includeFollowing = false,
  }: IFindByUsernameDTO): Promise<User | undefined> {
    const relations = [];

    if (includeFollowers) relations.push('followers');
    if (includeFollowing) relations.push('following');

    const user = await this.repository.findOne({
      relations,
      where: { username },
    });

    return user;
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
