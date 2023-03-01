import { IPasswordHashing } from '@/application/ports';
import { ISeedUserRepository } from '@/application/ports/repositories/user';
import { IUser } from '@/domain/models/user/user.model';
import ISeedUserUseCase from '@/domain/use-cases/user/seed-user.use-case';

// Controller for prepare the data
// And the useCase for make validation, hash etc

class SeedUserUseCase implements ISeedUserUseCase {
  constructor(
    private readonly seedUserRepository: ISeedUserRepository,
    private readonly passwordHashing: IPasswordHashing
  ) {}

  async seed(users: IUser[]): Promise<boolean> {
    const usersWithHasedPasssword = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await this.passwordHashing.hash(user.password || ''),
      }))
    );
    return this.seedUserRepository.seed(usersWithHasedPasssword);
  }
}

export default SeedUserUseCase;
