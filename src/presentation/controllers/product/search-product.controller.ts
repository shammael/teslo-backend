/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable no-unsafe-optional-chaining */
import IController from '@/application/ports/controller/controller';
import IPaginate from '@/application/ports/paginate/paginate';
import IRequestModel from '@/application/ports/request/request-model';
import IResponseHander from '@/application/ports/response/response-handler';
import IResponseModel from '@/application/ports/response/response-model';
import IProduct from '@/domain/models/product/product.model';
import { ISearchProductUseCase } from '@/domain/use-cases';

class SearchProductController implements IController {
  constructor(
    private readonly searchProductUseCase: ISearchProductUseCase,
    private readonly presenter: IResponseHander<IPaginate<IProduct>>
  ) {}

  async handleRequest(
    requestModel: IRequestModel<unknown, unknown, { q: string }>
  ): Promise<IResponseModel<IPaginate<IProduct>>> {
    let { q = '' } = requestModel?.query!;

    // TODO: We have to make the q validation

    q = q.toLowerCase();

    const products = await this.searchProductUseCase.search(q);

    return this.presenter.response({ body: products });
  }
}

export default SearchProductController;
