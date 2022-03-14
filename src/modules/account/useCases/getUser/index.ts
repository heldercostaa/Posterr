import { UserRepository } from '../../repositories/implementations/UserRepository';
import { GetUserController } from './GetUserController';
import { GetUserUseCase } from './GetUserUseCase';

export default (): GetUserController => {
  const userRepository = new UserRepository();
  const getUserUseCase = new GetUserUseCase(userRepository);
  const getUserController = new GetUserController(getUserUseCase);

  return getUserController;
};
