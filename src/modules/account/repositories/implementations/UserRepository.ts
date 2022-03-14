import { getRepository, Repository } from 'typeorm';

import { AppError } from '../../../../errors/AppError';
import { User } from '../../entities/User';
import {
  ICreateUserDTO,
  IFollowUserDTO,
  IUserRepository,
} from '../IUserRepository';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ username }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({ username });

    await this.repository.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repository.findOne({ username });

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
