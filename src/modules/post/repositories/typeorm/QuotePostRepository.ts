import { getRepository, Repository } from 'typeorm';

import { ICreateQuotePostDTO } from '@modules/post/dtos/ICreateQuotePostDTO';
import { IListAllQuotePostByDTO } from '@modules/post/dtos/IListAllQuotePostByDTO';
import { IQuotePostFindByDTO } from '@modules/post/dtos/IQuotePostFindByDTO';
import { QuotePost } from '@modules/post/entities/QuotePost';

import { IQuotePostRepository } from '../IQuotePostRepository';

export class QuotePostRepository implements IQuotePostRepository {
  private repository: Repository<QuotePost>;

  constructor() {
    this.repository = getRepository(QuotePost);
  }

  async create({
    creatorId,
    originalPostId,
    message,
  }: ICreateQuotePostDTO): Promise<void> {
    const quotePost = this.repository.create({
      message,
      creatorId,
      originalPost: { id: originalPostId },
    });

    await this.repository.save(quotePost);
  }

  async findBy({
    creatorId,
    originalPostId,
  }: IQuotePostFindByDTO): Promise<QuotePost[] | null> {
    const quotePost = await this.repository.find({
      where: { creatorId, originalPostId },
    });

    return quotePost || null;
  }

  async listAllQuotePostBy({
    creatorIds,
  }: IListAllQuotePostByDTO): Promise<QuotePost[]> {
    let quotePostQuery = this.repository.createQueryBuilder('quotePost');

    if (creatorIds && creatorIds.length > 0) {
      quotePostQuery = quotePostQuery.andWhere(
        '"creatorId" IN (:...creatorIds)',
        {
          creatorIds,
        }
      );
    }

    const posts = await quotePostQuery.getMany();

    return posts;
  }
}
