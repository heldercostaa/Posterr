import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IFindByUsernameDTO } from '../dtos/IFindByUsernameDTO';
import { IFollowUserDTO } from '../dtos/IFollowUserDTO';
import { IUnfollowUserDTO } from '../dtos/IUnfollowUserDTO';
import { User } from '../entities/User';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByUsername(data: IFindByUsernameDTO): Promise<User | undefined>;
  follow(data: IFollowUserDTO): Promise<void>;
  unfollow(data: IUnfollowUserDTO): Promise<void>;
}
