import { CreateUserUseCase } from '@/application/use-cases/user';
import { BcryptAdapter } from '@/common/adapters';
import {
  createUserRepository,
  getUserRepository,
} from '@/infrastructure/mongo/repositories/user/user-default.repository';
import { CreateUserController } from '@/presentation/controllers/user';
import { GenericCreatedResponse } from '@/presentation/responses';

const createUserControllerFactory = () => {
  const bcrypt = new BcryptAdapter();

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserRepository,
    bcrypt
  );

  const presenter = new GenericCreatedResponse<{ message: string }>();

  const createUserController = new CreateUserController(
    createUserUseCase,
    presenter
  );

  return { createUserController };
};

export default createUserControllerFactory;
