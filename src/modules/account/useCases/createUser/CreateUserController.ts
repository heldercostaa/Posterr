import { Request, Response } from 'express';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.body;

    await this.createUserUseCase.execute({ username });

    return response.status(201).send();
  }
}
