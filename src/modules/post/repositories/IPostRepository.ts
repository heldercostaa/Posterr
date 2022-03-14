import { ICreatePostDTO } from '../dtos/ICreatePostDTO';

export interface IPostRepository {
  create(data: ICreatePostDTO): Promise<void>;
}
