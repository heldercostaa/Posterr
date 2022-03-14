import { IUserRepository } from '@modules/account/repositories/IUserRepository';
import { Post } from '@modules/post/entities/Post';
import { QuotePost } from '@modules/post/entities/QuotePost';
import { Repost } from '@modules/post/entities/Repost';
import { IPostRepository } from '@modules/post/repositories/IPostRepository';
import { IQuotePostRepository } from '@modules/post/repositories/IQuotePostRepository';
import { IRepostRepository } from '@modules/post/repositories/IRepostRepository';
import { AppError } from '@shared/errors/AppError';

type PostOrRepostOrQuotePost = Post | Repost | QuotePost;

interface IRequest {
  username: string;
}

export class ListSelfPostsUseCase {
  constructor(
    private userRepository: IUserRepository,
    private postRepository: IPostRepository,
    private repostRepository: IRepostRepository,
    private quotePostRepository: IQuotePostRepository
  ) {}

  async execute({ username }: IRequest): Promise<PostOrRepostOrQuotePost[]> {
    const user = await this.userRepository.findBy({ username });

    if (!user) {
      throw new AppError('User not found');
    }

    const posts = await this.postRepository.listAllPostBy({
      creatorIds: [user.id],
    });
    const reposts = await this.repostRepository.listAllRepostBy({
      creatorIds: [user.id],
    });
    const quotePosts = await this.quotePostRepository.listAllQuotePostBy({
      creatorIds: [user.id],
    });

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
