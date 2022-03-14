import { Request, Response } from 'express';

import { RepostUseCase } from './RepostUseCase';

export class RepostController {
  constructor(private repostUseCase: RepostUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const username = request.headers.username as string;
    const { id: originalPostId } = request.params;

    await this.repostUseCase.execute({
      creatorUsername: username,
      originalPostId,
    });

    return response.status(201).send();
  }
}
