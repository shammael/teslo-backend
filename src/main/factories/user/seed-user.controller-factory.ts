import { SeedUserUseCase } from '@/application/use-cases/user';
import { BcryptAdapter } from '@/common/adapters';
import { seedUsersRepository } from '@/infrastructure/mongo/repositories/user/user-default.repository';
import SeedUserController from '@/presentation/controllers/user/seed-user.controller';
import { GenericCreatedResponse } from '@/presentation/responses';

const seedUserControllerFactory = () => {
  const bcryptAdapter = new BcryptAdapter();
  const seedUserUseCase = new SeedUserUseCase(
    seedUsersRepository,
    bcryptAdapter
  );
  const presenter = new GenericCreatedResponse<{ message: string }>();

  const seedUserController = new SeedUserController(seedUserUseCase, presenter);

  return { seedUserController };
};

export default seedUserControllerFactory;
