import { UnauthorizedError } from '@/application/errors';
import { IGetUserRepository } from '@/application/ports';
import { IToken } from '@/application/ports/security';
import { IRefreshTokenUseCase } from '@/domain/use-cases';

class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly getUserRepository: IGetUserRepository,
    private readonly tokenAdapter: IToken
  ) {}

  async refresh(tokenRequest: string): Promise<string> {
    try {
      this.tokenAdapter.verify(
        tokenRequest,
        process.env.REFRESH_TOKEN as string
      ) as string;
    } catch (error) {
      throw new UnauthorizedError();
    }

    const user = await this.getUserRepository.get({ token: tokenRequest });

    if (!user) {
      throw new UnauthorizedError();
    }

    const token = this.tokenAdapter.sign(
      user._id,
      process.env.ACCESS_TOKEN as string,
      {
        expiresIn: '5m',
      }
    );

    return token;
  }
}

export default RefreshTokenUseCase;
