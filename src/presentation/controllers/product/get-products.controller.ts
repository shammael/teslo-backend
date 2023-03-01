/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-unsafe-optional-chaining */
import IController from '@/application/ports/controller/controller';
import IPaginate from '@/application/ports/paginate/paginate';
import IRequestModel from '@/application/ports/request/request-model';
import IResponseHander from '@/application/ports/response/response-handler';
import IProduct from '@/domain/models/product/product.model';
import sanitizerSingleton from '@/common/adapters/sanitizers';
import { IGetProductsUseCase } from '@/domain/use-cases';

type TRequestParams = IRequestModel<
  unknown,
  unknown,
  {
    gender: string;
    page: string;
    limit: string;
    flat: string;
  }
>;

class GetProductsController implements IController {
  constructor(
    private getProductsUseCase: IGetProductsUseCase,
    private presenter: IResponseHander<IPaginate<IProduct>>
  ) {}

  async handleRequest(requestModel: TRequestParams) {
    const { gender, page, limit, flat } = requestModel.query!;
    const response = await this.getProductsUseCase.getAll(
      this.sanitize('gender', gender) || 'all',
      {
        limit: parseInt(this.sanitize('limit', limit), 10) || 10,
        page: parseInt(this.sanitize('page', page), 10) || 0,
        pagination: JSON.parse(
          this.sanitize('flat', flat) || 'true'
        ) as boolean,
      }
    );
    return this.presenter.response({ body: response });
  }

  private sanitize(field: string, value: string) {
    return sanitizerSingleton.sanitize(field, value);
  }
}

export default GetProductsController;
