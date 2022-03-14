import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IFindByUsernameDTO } from '../dtos/IFindByUsernameDTO';
import { IFollowUserDTO } from '../dtos/IFollowUserDTO';
import { User } from '../entities/User';

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByUsername(data: IFindByUsernameDTO): Promise<User>;
  follow(data: IFollowUserDTO): Promise<User>;
}
