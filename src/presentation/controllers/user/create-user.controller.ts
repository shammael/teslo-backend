import { RequestValidationError } from '@/application/errors';
import {
  IController,
  IResponseHander,
  IResponseModel,
} from '@/application/ports';
import sanitizerSingleton from '@/common/adapters/sanitizers';
import { objectKeyExists } from '@/common/helpers/object/object-key-exist';
import { TCreateUserRequestModel } from '@/domain/requests/user';
import { ICreateUserUseCase } from '@/domain/use-cases';

class CreateUserController implements IController {
  constructor(
    private readonly createUserUseCase: ICreateUserUseCase,
    private readonly presenter: IResponseHander<{ message: string }>
  ) {}

  async handleRequest(
    requestModel: TCreateUserRequestModel
  ): Promise<IResponseModel<{ message: string }>> {
    if (!objectKeyExists(requestModel, 'body')) {
      throw new RequestValidationError('Body is missing');
    }

    const { email, name, password } = requestModel.body;

    const sanititizedQuery = {
      email: this.sanitize('email', email),
      name: this.sanitize('name', name),
      password: this.sanitize('password', password),
    };

    const { message } = await this.createUserUseCase.create(sanititizedQuery);
    return this.presenter.response({ body: { message } });
  }

  private sanitize(field: string, value: string) {
    return sanitizerSingleton.sanitize(field, value);
  }
}

export default CreateUserController;
