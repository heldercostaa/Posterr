import { getRepository, Repository } from 'typeorm';

import { ICreateRepostDTO } from '@modules/post/dtos/ICreateRepostDTO';
import { IListAllRepostByDTO } from '@modules/post/dtos/IListAllRepostByDTO';
import { IRepostFindByDTO } from '@modules/post/dtos/IRepostFindByDTO';
import { Repost } from '@modules/post/entities/Repost';

import { IRepostRepository } from '../IRepostRepository';

export class RepostRepository implements IRepostRepository {
  private repository: Repository<Repost>;

  constructor() {
    this.repository = getRepository(Repost);
  }

  async create({ creatorId, originalPostId }: ICreateRepostDTO): Promise<void> {
    const repost = this.repository.create({
      creatorId,
      originalPost: { id: originalPostId },
    });

    await this.repository.save(repost);
  }

  async findBy({
    creatorId,
    originalPostId,
  }: IRepostFindByDTO): Promise<Repost | null> {
    const repost = await this.repository.findOne({
      where: { creatorId, originalPostId },
    });

    return repost || null;
  }

  async listAllRepostBy({
    creatorIds,
  }: IListAllRepostByDTO): Promise<Repost[]> {
    let repostQuery = this.repository.createQueryBuilder('repost');

    if (creatorIds && creatorIds.length > 0) {
      repostQuery = repostQuery.andWhere('"creatorId" IN (:...creatorIds)', {
        creatorIds,
      });
    }

    const posts = await repostQuery.getMany();

    return posts;
  }
}
