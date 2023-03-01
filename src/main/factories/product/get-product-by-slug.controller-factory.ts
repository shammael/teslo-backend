import GetProductBySlugUseCase from '@/application/use-cases/product/find-product-by-slug.use-case';
import IProduct from '@/domain/models/product/product.model';
import { getProductBySlugRepository } from '@/infrastructure/mongo/repositories/product/product-default.repository';
import GetProductBySlugController from '@/presentation/controllers/product/get-product-by-slug.controller';
import GenericSuccessResponse from '@/presentation/responses/generic-success.response';

const getProductBySlugControllerFactory = () => {
  const getProductBySlugUseCase = new GetProductBySlugUseCase(
    getProductBySlugRepository
  );

  const getProductBySlugPresenter = new GenericSuccessResponse<
    IProduct | never
  >();

  const getProductBySlugController = new GetProductBySlugController(
    getProductBySlugUseCase,
    getProductBySlugPresenter
  );

  return { getProductBySlugController };
};

export default getProductBySlugControllerFactory;
