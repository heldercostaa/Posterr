import { getRepository, Repository } from 'typeorm';

import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IFindByUsernameDTO } from '../../dtos/IFindByUsernameDTO';
import { IFollowUserDTO } from '../../dtos/IFollowUserDTO';
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
  }: IFindByUsernameDTO): Promise<User> {
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
    userToFollowId,
    userToBeFollowedId,
  }: IFollowUserDTO): Promise<User> {
    // TODO: Implement
    throw new AppError('Method not implemented');
  }
}
