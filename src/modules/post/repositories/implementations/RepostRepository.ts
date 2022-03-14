import { getRepository, Repository } from 'typeorm';

import { ICreateRepostDTO } from '../../dtos/ICreateRepostDTO';
import { IRepostFindByDTO } from '../../dtos/IRepostFindByDTO';
import { Repost } from '../../entities/Repost';
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

  async listAll(): Promise<Repost[]> {
    const posts = await this.repository.find();

    return posts;
  }
}
