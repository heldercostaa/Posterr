import { Request, Response } from 'express';

import { FollowUserUseCase } from './FollowUserUseCase';

export class FollowUserController {
  constructor(private followUserUseCase: FollowUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const userWhoFollowsUsername = request.headers.username as string;
    const { userBeingFollowedUsername } = request.params;

    await this.followUserUseCase.execute({
      userWhoFollowsUsername,
      userBeingFollowedUsername,
    });

    return response.status(201).send();
  }
}
