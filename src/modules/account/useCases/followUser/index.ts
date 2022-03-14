import { UserRepository } from '../../repositories/implementations/UserRepository';
import { FollowUserController } from './FollowUserController';
import { FollowUserUseCase } from './FollowUserUseCase';

export default (): FollowUserController => {
  const userRepository = new UserRepository();
  const getUserUseCase = new FollowUserUseCase(userRepository);
  const getUserController = new FollowUserController(getUserUseCase);

  return getUserController;
};
