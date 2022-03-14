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

export class ListSelfPostsUseCase {
  constructor(
    private userRepository: IUserRepository,
    private postRepository: IPostRepository,
    private repostRepository: IRepostRepository
  ) {}

  async execute({ username }: IRequest): Promise<PostOrRepost[]> {
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

    const postsAndReposts: PostOrRepost[] = [...posts, ...reposts];

    postsAndReposts.sort((p1: PostOrRepost, p2: PostOrRepost) => {
      return p1.created_at.getTime() - p2.created_at.getTime();
    });

    return postsAndReposts;
  }
}
