import IPaginate from '@/application/ports/paginate/paginate';
import GetProductsUseCase from '@/application/use-cases/product/get-products.use-case';
import IProduct from '@/domain/models/product/product.model';
import { getProductsRepository } from '@/infrastructure/mongo/repositories/product/product-default.repository';
import { GetProductsController } from '@/presentation/controllers/product';
import GenericSuccessResponse from '@/presentation/responses/generic-success.response';

const getProductsControllerFactory = () => {
  const getProductsUseCase = new GetProductsUseCase(getProductsRepository);
  const getProductPresenter = new GenericSuccessResponse<IPaginate<IProduct>>();

  const getProductsController = new GetProductsController(
    getProductsUseCase,
    getProductPresenter
  );

  return { getProductsController };
};

export default getProductsControllerFactory;
