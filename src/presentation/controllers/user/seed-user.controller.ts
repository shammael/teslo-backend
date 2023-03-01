import IController from '@/application/ports/controller/controller';
import IResponseHander from '@/application/ports/response/response-handler';
import IResponseModel from '@/application/ports/response/response-model';
import { initialData } from '@/common/helpers/seed/products';
import ISeedUserUseCase from '@/domain/use-cases/user/seed-user.use-case';

class SeedUserController implements IController {
  constructor(
    private readonly seedUserUseCase: ISeedUserUseCase,
    private readonly presenter: IResponseHander<{ message: string }>
  ) {}

  async handleRequest(): Promise<IResponseModel<unknown>> {
    await this.seedUserUseCase.seed(initialData.users);
    return this.presenter.response({ body: { message: 'Seed completed' } });
  }
}

export default SeedUserController;
