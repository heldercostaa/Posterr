import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IFindByDTO } from '../../dtos/IFindByDTO';
import { IFollowUserDTO } from '../../dtos/IFollowUserDTO';
import { IUnfollowUserDTO } from '../../dtos/IUnfollowUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../IUserRepository';

export class InMemoryUserRepository implements IUserRepository {
  users: User[] = [];

  async create({ username }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { username });

    this.users.push(user);
  }

  async findBy({ username }: IFindByDTO): Promise<User | null> {
    const user = this.users.find((u) => u.username === username);

    return user || null;
  }

  async follow(data: IFollowUserDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async unfollow(data: IUnfollowUserDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
