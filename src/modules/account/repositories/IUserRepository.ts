import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IFindByDTO } from '../dtos/IFindByDTO';
import { IFollowUserDTO } from '../dtos/IFollowUserDTO';
import { IUnfollowUserDTO } from '../dtos/IUnfollowUserDTO';
import { User } from '../entities/User';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findBy(data: IFindByDTO): Promise<User | null>;
  follow(data: IFollowUserDTO): Promise<void>;
  unfollow(data: IUnfollowUserDTO): Promise<void>;
}
