import { Request, Response } from 'express';

import { UnfollowUserUseCase } from './UnfollowUserUseCase';

export class UnfollowUserController {
  constructor(private unfollowUserUseCase: UnfollowUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userWhoUnfollowsUsername = request.headers.username as string;
    const { userBeingUnfollowedUsername } = request.params;

    await this.unfollowUserUseCase.execute({
      userWhoUnfollowsUsername,
      userBeingUnfollowedUsername,
    });

    return response.status(201).send();
  }
}
