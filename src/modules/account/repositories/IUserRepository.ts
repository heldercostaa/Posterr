import { User } from '../entities/User';

export interface ICreateUserDTO {
  username: string;
}

export interface IFollowUserDTO {
  userToFollowId: string;
  userToBeFollowedId: string;
}

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByUsername(username: string): Promise<User>;
  follow(data: IFollowUserDTO): Promise<User>;
}
