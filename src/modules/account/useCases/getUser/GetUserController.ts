import { Request, Response } from 'express';

import { GetUserUseCase } from './GetUserUseCase';

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const user = await this.getUserUseCase.execute({ username });

    return response.status(200).json(user);
  }
}