import { Request, Response } from 'express';

import { CreatePostUseCase } from './CreatePostUseCase';

export class CreatePostController {
  constructor(private createPostUseCase: CreatePostUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const username = request.headers.username as string;
    const { message } = request.body;

    await this.createPostUseCase.execute({
      creatorUsername: username,
      message,
    });

    return response.status(201).send();
  }
}
