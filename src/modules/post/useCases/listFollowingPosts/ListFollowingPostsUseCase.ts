import { AppError } from '../../../../errors/AppError';
import { IUserRepository } from '../../../account/repositories/IUserRepository';
import { Post } from '../../entities/Post';
import { Repost } from '../../entities/Repost';
import { IPostRepository } from '../../repositories/IPostRepository';
import { IRepostRepository } from '../../repositories/IRepostRepository';

type PostOrRepost = Post | Repost;

interface IRequest {
  username: string;
}

export class ListFollowingPostsUseCase {
  constructor(
    private userRepository: IUserRepository,
    private postRepository: IPostRepository,
    private repostRepository: IRepostRepository
  ) {}

  async execute({ username }: IRequest): Promise<PostOrRepost[]> {
    const user = await this.userRepository.findBy({
      username,
      includeFollowing: true,
    });

    if (!user) {
      throw new AppError('User not found');
    }

    const followingIds = user.following.map((following) => following.id);

    if (followingIds.length <= 0) {
      return [];
    }

    const posts = await this.postRepository.listAllPostBy({
      creatorIds: followingIds,
    });
    const reposts = await this.repostRepository.listAllRepostBy({
      creatorIds: followingIds,
    });

    const postsAndReposts: PostOrRepost[] = [...posts, ...reposts];

    postsAndReposts.sort((p1: PostOrRepost, p2: PostOrRepost) => {
      return p1.created_at.getTime() - p2.created_at.getTime();
    });

    return postsAndReposts;
  }
}
