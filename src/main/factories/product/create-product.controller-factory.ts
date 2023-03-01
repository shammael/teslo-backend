import CreateProductUseCase from '@/application/use-cases/product/create-product.use-case';
import IProduct from '@/domain/models/product/product.model';
import {
  createProductRepository,
  getProductBySlugRepository,
} from '@/infrastructure/mongo/repositories/product/product-default.repository';
import { CreateProductController } from '@/presentation/controllers/product';
import { GenericCreatedResponse } from '@/presentation/responses';

const createProductControllerFactory = () => {
  const createProductPresenter = new GenericCreatedResponse<IProduct>();
  const createProductUseCase = new CreateProductUseCase(
    createProductRepository,
    getProductBySlugRepository
  );
  const createdProductController = new CreateProductController(
    createProductUseCase,
    createProductPresenter
  );

  return {
    createdProductController,
  };
};

export default createProductControllerFactory;
