import { ICreateRepostDTO } from '../dtos/ICreateRepostDTO';
import { IRepostFindByDTO } from '../dtos/IRepostFindByDTO';
import { Repost } from '../entities/Repost';

export interface IRepostRepository {
  create(data: ICreateRepostDTO): Promise<void>;
  findBy(data: IRepostFindByDTO): Promise<Repost | null>;
}
