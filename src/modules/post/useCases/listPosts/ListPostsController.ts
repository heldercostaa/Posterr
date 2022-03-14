import { Request, Response } from 'express';

import { ListPostsUseCase } from './ListPostsUseCase';

export class ListPostsController {
  constructor(private listPostsUseCase: ListPostsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const postsAndReposts = await this.listPostsUseCase.execute();

    return response.status(200).json(postsAndReposts);
  }
}
