import { RefreshTokenUseCase } from '@/application/use-cases/auth';
import { JWTAdapater } from '@/common/adapters';
import { getUserRepository } from '@/infrastructure/mongo/repositories/user/user-default.repository';
import { RefreshTokenController } from '@/presentation/controllers/auth';
import GenericSuccessResponse from '@/presentation/responses/generic-success.response';

const refreshTokenControllerFactory = () => {
  const tokenAdapater = new JWTAdapater();
  const refreshTokenUseCase = new RefreshTokenUseCase(
    getUserRepository,
    tokenAdapater
  );

  const presenter = new GenericSuccessResponse<string>();

  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase,
    presenter
  );

  return { refreshTokenController };
};

export default refreshTokenControllerFactory;
