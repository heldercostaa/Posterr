import { getRepository, Repository } from 'typeorm';

import { ICreatePostDTO } from '../../dtos/ICreatePostDTO';
import { Post } from '../../entities/Post';
import { IPostRepository } from '../IPostRepository';

export class PostRepository implements IPostRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = getRepository(Post);
  }

  async create({ userId, message }: ICreatePostDTO): Promise<void> {
    const post = this.repository.create({ user: { id: userId }, message });

    await this.repository.save(post);
  }
}
