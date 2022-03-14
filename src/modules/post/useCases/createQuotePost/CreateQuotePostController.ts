import { Request, Response } from 'express';

import { CreateQuotePostUseCase } from './CreateQuotePostUseCase';

export class CreateQuotePostController {
  constructor(private createQuotePostUseCase: CreateQuotePostUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const username = request.headers.username as string;
    const { id: originalPostId } = request.params;
    const { message } = request.body;

    await this.createQuotePostUseCase.execute({
      message,
      creatorUsername: username,
      originalPostId,
    });

    return response.status(201).send();
  }
}
