import { ICreateRepostDTO } from '../dtos/ICreateRepostDTO';
import { IListAllRepostByDTO } from '../dtos/IListAllRepostByDTO';
import { IRepostFindByDTO } from '../dtos/IRepostFindByDTO';
import { Repost } from '../entities/Repost';

export interface IRepostRepository {
  create(data: ICreateRepostDTO): Promise<void>;
  findBy(data: IRepostFindByDTO): Promise<Repost | null>;
  listAllRepostBy(data: IListAllRepostByDTO): Promise<Repost[]>;
}
