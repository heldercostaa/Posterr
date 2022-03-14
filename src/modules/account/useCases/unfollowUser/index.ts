import { UserRepository } from '../../repositories/implementations/UserRepository';
import { UnfollowUserController } from './UnfollowUserController';
import { UnfollowUserUseCase } from './UnfollowUserUseCase';

export default (): UnfollowUserController => {
  const userRepository = new UserRepository();
  const getUserUseCase = new UnfollowUserUseCase(userRepository);
  const getUserController = new UnfollowUserController(getUserUseCase);

  return getUserController;
};