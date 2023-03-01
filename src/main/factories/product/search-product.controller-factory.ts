import IPaginate from '@/application/ports/paginate/paginate';
import SearchProductUseCase from '@/application/use-cases/product/search-product.use-case';
import IProduct from '@/domain/models/product/product.model';
import { searchProductsRepository } from '@/infrastructure/mongo/repositories/product/product-default.repository';
import SearchProductController from '@/presentation/controllers/product/search-product.controller';
import GenericSuccessResponse from '@/presentation/responses/generic-success.response';

const searchProductControllerFactory = () => {
  const searchProductUseCase = new SearchProductUseCase(
    searchProductsRepository
  );

  const presenter = new GenericSuccessResponse<IPaginate<IProduct>>();

  const searchProductController = new SearchProductController(
    searchProductUseCase,
    presenter
  );

  return { searchProductController };
};

export default searchProductControllerFactory;
