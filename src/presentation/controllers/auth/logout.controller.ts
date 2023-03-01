import { UnauthorizedError } from '@/application/errors';
import {
  IController,
  IResponseHander,
  IResponseModel,
} from '@/application/ports';
import sanitizerSingleton from '@/common/adapters/sanitizers';
import { objectKeyExists } from '@/common/helpers/object/object-key-exist';
import { TAuthRequestModel } from '@/domain/requests/auth';
import { ILogoutUseCase } from '@/domain/use-cases';

class LogoutController implements IController {
  constructor(
    private readonly logoutUseCase: ILogoutUseCase,
    private readonly presenter: IResponseHander<unknown>
  ) {}

  async handleRequest(
    requestModel: TAuthRequestModel
  ): Promise<IResponseModel<unknown>> {
    if (!objectKeyExists(requestModel, 'cookie')) {
      throw new UnauthorizedError();
    }

    const cookie = requestModel?.cookie;

    const sanitizedCookie = this.sanitize('cookie', cookie.jwt);

    await this.logoutUseCase.logout(sanitizedCookie);

    return this.presenter.response({
      cookieOptions: {
        clearCookie: {
          name: 'jwt',
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

export default LogoutController;
