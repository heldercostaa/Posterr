import { getRepository, Repository } from 'typeorm';

import { ICreatePostDTO } from '../../dtos/ICreatePostDTO';
import { IListAllPostByDTO } from '../../dtos/IListAllPostByDTO';
import { IPostFindByDTO } from '../../dtos/IPostFindByDTO';
import { Post } from '../../entities/Post';
import { IPostRepository } from '../IPostRepository';

export class PostRepository implements IPostRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = getRepository(Post);
  }

  async create({ creatorId, message }: ICreatePostDTO): Promise<void> {
    const post = this.repository.create({
      creator: { id: creatorId },
      message,
    });

    await this.repository.save(post);
  }

  async findBy({ id, creatorId }: IPostFindByDTO): Promise<Post | null> {
    let postQuery = this.repository.createQueryBuilder('post');

    if (id) {
      postQuery = postQuery.andWhere('id = :id', { id });
    }

    if (creatorId) {
      postQuery = postQuery.andWhere('creatorId = :creatorId', { creatorId });
    }

    const post = await postQuery.getOne();

    return post || null;
  }

  async listAllPostBy({ creatorIds }: IListAllPostByDTO): Promise<Post[]> {
    let postQuery = this.repository.createQueryBuilder('post');

    if (creatorIds && creatorIds.length > 0) {
      postQuery = postQuery.andWhere('"creatorId" IN (:...creatorIds)', {
        creatorIds,
      });
    }

    const posts = await postQuery.getMany();

    return posts;
  }
}
