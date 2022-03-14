import { ICreateQuotePostDTO } from '../dtos/ICreateQuotePostDTO';
import { IListAllQuotePostByDTO } from '../dtos/IListAllQuotePostByDTO';
import { IQuotePostFindByDTO } from '../dtos/IQuotePostFindByDTO';
import { QuotePost } from '../entities/QuotePost';

export interface IQuotePostRepository {
  create(data: ICreateQuotePostDTO): Promise<void>;
  findBy(data: IQuotePostFindByDTO): Promise<QuotePost[] | null>;
  listAllQuotePostBy(data: IListAllQuotePostByDTO): Promise<QuotePost[]>;
}
