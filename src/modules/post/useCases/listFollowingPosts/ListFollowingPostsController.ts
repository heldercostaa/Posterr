import { Request, Response } from 'express';

import { ListFollowingPostsUseCase } from './ListFollowingPostsUseCase';

export class ListFollowingPostsController {
  constructor(private listFollowingPostsUseCase: ListFollowingPostsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const username = request.headers.username as string;

    const postsAndReposts = await this.listFollowingPostsUseCase.execute({
      username,
    });

    return response.status(200).json(postsAndReposts);
  }
}
