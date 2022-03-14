import { Request, Response } from 'express';

import { ListSelfPostsUseCase } from './ListSelfPostsUseCase';

export class ListSelfPostsController {
  constructor(private listPostsUseCase: ListSelfPostsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const username = request.headers.username as string;

    const postsAndReposts = await this.listPostsUseCase.execute({ username });

    return response.status(200).json(postsAndReposts);
  }
}
