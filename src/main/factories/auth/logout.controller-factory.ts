import { LogoutUseCase } from '@/application/use-cases/auth';
import { JWTAdapater } from '@/common/adapters';
import { logoutRepository } from '@/infrastructure/mongo/repositories/user/user-default.repository';
import LogoutController from '@/presentation/controllers/auth/logout.controller';
import { GenericNoContentResponse } from '@/presentation/responses';

const logoutControllerFactory = () => {
  const token = new JWTAdapater();

  const logoutUseCase = new LogoutUseCase(logoutRepository, token);
  const presenter = new GenericNoContentResponse();

  const logoutController = new LogoutController(logoutUseCase, presenter);

  return { logoutController };
};

export default logoutControllerFactory;
