import {
  RequestValidationError,
  UnauthorizedError,
} from '@/application/errors';
import {
  IController,
  IResponseHander,
  IResponseModel,
} from '@/application/ports';
import sanitizerSingleton from '@/common/adapters/sanitizers';
import { objectKeyExists } from '@/common/helpers/object/object-key-exist';
import { TAuthRequestModel } from '@/domain/requests/auth';
import { IRefreshTokenUseCase } from '@/domain/use-cases';

class RefreshTokenController implements IController {
  constructor(
    private readonly refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly presenter: IResponseHander<string>
  ) {}

  async handleRequest(
    requestModel: TAuthRequestModel
  ): Promise<IResponseModel<string>> {
    if (!objectKeyExists(requestModel, 'cookie')) {
      throw new UnauthorizedError();
    }

    const cookie = requestModel?.cookie;

    const sanitizedCookie = this.sanitize('cookie', cookie.jwt);

    const token = await this.refreshTokenUseCase.refresh(sanitizedCookie);

    return this.presenter.response({ body: token });
  }

  private sanitize(field: string, value: string) {
    return sanitizerSingleton.sanitize(field, value);
  }
}

export default RefreshTokenController;
