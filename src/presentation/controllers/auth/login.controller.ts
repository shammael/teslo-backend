import {
  IController,
  IResponseHander,
  IResponseModel,
} from '@/application/ports';
import sanitizerSingleton from '@/common/adapters/sanitizers';
import TLoginRequestModel from '@/domain/requests/auth/login.request';
import { ILoginUseCase } from '@/domain/use-cases';
import { IUserWithToken } from '@/domain/use-cases/auth/login.use-case';

class LoginController implements IController {
  constructor(
    private readonly loginUseCase: ILoginUseCase,
    private readonly presenter: IResponseHander<IUserWithToken>
  ) {}

  async handleRequest(
    requestModel: TLoginRequestModel
  ): Promise<IResponseModel<IUserWithToken>> {
    const email = requestModel.body?.email;
    const password = requestModel.body?.password;

    const userCredentials = {
      email: this.sanitize('email', email || ''),
      password: this.sanitize('password', password || ''),
    };

    const { refreshToken, userWithToken } = await this.loginUseCase.login(
      userCredentials
    );

    return this.presenter.response({
      body: userWithToken,
      cookieOptions: {
        setCookie: {
          name: 'jwt',
          data: refreshToken,
          options: {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          },
        },
      },
    });
  }

  private sanitize(field: string, value: string) {
    return sanitizerSingleton.sanitize(field, value);
  }
}

export default LoginController;
