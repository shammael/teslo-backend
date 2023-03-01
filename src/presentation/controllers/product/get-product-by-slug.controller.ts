/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NotFoundError } from '@/application/errors';
import IController from '@/application/ports/controller/controller';
import IRequestModel from '@/application/ports/request/request-model';
import IResponseHander from '@/application/ports/response/response-handler';
import IResponseModel from '@/application/ports/response/response-model';
import sanitizerSingleton from '@/common/adapters/sanitizers';
import IProduct from '@/domain/models/product/product.model';
import { IGetProductBySlugUseCase } from '@/domain/use-cases';

class GetProductBySlugController implements IController {
  constructor(
    private readonly getProductBySlugUseCase: IGetProductBySlugUseCase,
    private readonly presenter: IResponseHander<IProduct | never>
  ) {}

  async handleRequest(
    requestModel: IRequestModel<unknown, { slug: string }>
  ): Promise<IResponseModel<IProduct>> {
    const { slug } = requestModel?.params!;
    const sanitizedSlug = this.sanitize('slug', slug);
    const product = await this.getProductBySlugUseCase.get(sanitizedSlug);
    if (!product) {
      throw new NotFoundError('Producto no encontrado');
    }
    return this.presenter.response({ body: product });
  }

  sanitize(field: string, value: string) {
    return sanitizerSingleton.sanitize(field, value);
  }
}

export default GetProductBySlugController;
