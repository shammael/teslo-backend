import { UnauthorizedError } from '@/application/errors';
import { ILogoutRepository } from '@/application/ports/repositories/auth';
import { JWTAdapater } from '@/common/adapters';
import { ILogoutUseCase } from '@/domain/use-cases';

class LogoutUseCase implements ILogoutUseCase {
  constructor(
    private readonly logoutRepository: ILogoutRepository,
    private readonly tokenAdapter: JWTAdapater
  ) {}

  async logout(tokenRequest: string): Promise<boolean> {
    try {
      const id = this.tokenAdapter.verify(
        tokenRequest,
        process.env.REFRESH_TOKEN as string
      ) as string;

      const user = await this.logoutRepository.logout(id);
      if (!user) {
        throw new Error();
      }
      return true;
    } catch (error) {
      throw new UnauthorizedError();
    }
  }
}

export default LogoutUseCase;
