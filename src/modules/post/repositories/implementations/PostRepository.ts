import { getRepository, Repository } from 'typeorm';

import { ICreatePostDTO } from '../../dtos/ICreatePostDTO';
import { IPostFindByDTO } from '../../dtos/IPostFindByDTO';
import { Post } from '../../entities/Post';
import { IPostRepository } from '../IPostRepository';

export class PostRepository implements IPostRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = getRepository(Post);
  }

  async create({ userId, message }: ICreatePostDTO): Promise<void> {
    const post = this.repository.create({
      user: { id: userId },
      message,
    });

    await this.repository.save(post);
  }

  async findBy({ id, userId }: IPostFindByDTO): Promise<Post | null> {
    let postQuery = this.repository.createQueryBuilder('post');

    if (id) {
      postQuery = postQuery.andWhere('id = :id', { id });
    }

    if (userId) {
      postQuery = postQuery.andWhere('userId = :userId', { userId });
    }

    const post = await postQuery.getOne();

    return post || null;
  }
}
