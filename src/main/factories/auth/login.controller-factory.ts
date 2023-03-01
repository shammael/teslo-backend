import { LoginUseCase } from '@/application/use-cases/auth';
import { BcryptAdapter, JWTAdapater } from '@/common/adapters';
import { IUserWithToken } from '@/domain/use-cases/auth/login.use-case';
import {
  getUserRepository,
  loginRepository,
} from '@/infrastructure/mongo/repositories/user/user-default.repository';
import { LoginController } from '@/presentation/controllers/auth';
import GenericSuccessResponse from '@/presentation/responses/generic-success.response';

const loginControllerFactory = () => {
  const bcryptAdapter = new BcryptAdapter();
  const tokenAdapater = new JWTAdapater();
  const loginUseCase = new LoginUseCase(
    getUserRepository,
    bcryptAdapter,
    loginRepository,
    tokenAdapater
  );

  const presenter = new GenericSuccessResponse<IUserWithToken>();

  const loginController = new LoginController(loginUseCase, presenter);

  return { loginController };
};

export default loginControllerFactory;
