/* eslint-disable no-underscore-dangle */
import { RequestValidationError } from '@/application/errors';
import { IGetUserRepository } from '@/application/ports';
import ILoginRepository from '@/application/ports/repositories/auth/login.repository';
import { IEncryptService, IToken } from '@/application/ports/security';
import { IUser } from '@/domain/models/user/user.model';
import { ILoginUseCase } from '@/domain/use-cases';
import { IUserWithToken } from '@/domain/use-cases/auth/login.use-case';
import { loginRequestZodValidatorAdapter } from '@/infrastructure/zod/adapters';

class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly getUserRepository: IGetUserRepository,
    private readonly passwordHashing: IEncryptService,
    private readonly loginRepository: ILoginRepository,
    private readonly token: IToken
  ) {}

  async login(
    userData: Pick<IUser, 'email' | 'password'>
  ): Promise<{ userWithToken: IUserWithToken; refreshToken: string }> {
    loginRequestZodValidatorAdapter(userData);

    const userDB = await this.getUserRepository.get({
      email: userData.email,
    });
    if (!userDB) {
      throw new RequestValidationError('Credenciales no válidas');
    }
    const valid = await this.passwordHashing.compare(
      userData.password as string,
      userDB?.password as string
    );

    if (!valid) {
      throw new RequestValidationError('Credenciales no válidas');
    }

    const ACCESS_TOKEN = this.token.sign(
      { id: userDB._id },
      process.env?.ACCESS_TOKEN as string,
      { expiresIn: '5m' }
    );

    const REFRESH_TOKEN = this.token.sign(
      { id: userDB._id },
      process.env?.REFRESH_TOKEN as string,
      { expiresIn: '1d' }
    );

    await this.loginRepository.login(
      userDB.email,
      userDB.password as string,
      REFRESH_TOKEN
    );

    const userWithToken = {
      user: userDB,
      token: ACCESS_TOKEN,
    };

    delete userWithToken.user.token;

    return {
      userWithToken,
      refreshToken: REFRESH_TOKEN,
    };
  }
}

export default LoginUseCase;
