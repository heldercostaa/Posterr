import { Post } from '../../entities/Post';
import { Repost } from '../../entities/Repost';
import { IPostRepository } from '../../repositories/IPostRepository';
import { IRepostRepository } from '../../repositories/IRepostRepository';

type PostOrRepost = Post | Repost;

export class ListPostsUseCase {
  constructor(
    private postRepository: IPostRepository,
    private repostRepository: IRepostRepository
  ) {}

  async execute(): Promise<PostOrRepost[]> {
    const posts = await this.postRepository.listAllPostBy({});
    const reposts = await this.repostRepository.listAllRepostBy({});

    const postsAndReposts: PostOrRepost[] = [...posts, ...reposts];

    postsAndReposts.sort((p1: PostOrRepost, p2: PostOrRepost) => {
      return p1.created_at.getTime() - p2.created_at.getTime();
    });

    return postsAndReposts;
  }
}
