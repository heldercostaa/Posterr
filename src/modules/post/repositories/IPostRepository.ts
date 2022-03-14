import { ICreatePostDTO } from '../dtos/ICreatePostDTO';
import { IListAllPostByDTO } from '../dtos/IListAllPostByDTO';
import { IPostFindByDTO } from '../dtos/IPostFindByDTO';
import { Post } from '../entities/Post';

export interface IPostRepository {
  create(data: ICreatePostDTO): Promise<void>;
  findBy(data: IPostFindByDTO): Promise<Post | null>;
  listAllPostBy(data: IListAllPostByDTO): Promise<Post[]>;
}
