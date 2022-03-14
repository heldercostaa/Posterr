import { Post } from '../../entities/Post';
import { QuotePost } from '../../entities/QuotePost';
import { Repost } from '../../entities/Repost';
import { IPostRepository } from '../../repositories/IPostRepository';
import { IQuotePostRepository } from '../../repositories/IQuotePostRepository';
import { IRepostRepository } from '../../repositories/IRepostRepository';

type PostOrRepostOrQuotePost = Post | Repost | QuotePost;

export class ListPostsUseCase {
  constructor(
    private postRepository: IPostRepository,
    private repostRepository: IRepostRepository,
    private quotePostRepository: IQuotePostRepository
  ) {}

  async execute(): Promise<PostOrRepostOrQuotePost[]> {
    const posts = await this.postRepository.listAllPostBy({});
    const reposts = await this.repostRepository.listAllRepostBy({});
    const quotePosts = await this.quotePostRepository.listAllQuotePostBy({});

    const postsAndReposts: PostOrRepostOrQuotePost[] = [
      ...posts,
      ...reposts,
      ...quotePosts,
    ];

    postsAndReposts.sort(
      (p1: PostOrRepostOrQuotePost, p2: PostOrRepostOrQuotePost) => {
        return p1.created_at.getTime() - p2.created_at.getTime();
      }
    );

    return postsAndReposts;
  }
}