import IController from '@/application/ports/controller/controller';
import IResponseHander from '@/application/ports/response/response-handler';
import IResponseModel from '@/application/ports/response/response-model';
import { initialData } from '@/common/helpers/seed/products';
import IProduct from '@/domain/models/product/product.model';
import { ISeedProductsUseCase } from '@/domain/use-cases';

class SeedProductController implements IController {
  constructor(
    private readonly seedProductUseCase: ISeedProductsUseCase,
    private readonly presenter: IResponseHander<{ message: string }>
  ) {}

  async handleRequest(): Promise<IResponseModel<{ message: string }>> {
    await this.seedProductUseCase.seed(initialData.products as IProduct[]);
    return this.presenter.response({ body: { message: 'Seed completed' } });
  }
}

export default SeedProductController;
