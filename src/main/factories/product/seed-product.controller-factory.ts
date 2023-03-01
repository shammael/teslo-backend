import SeedProductsUseCase from '@/application/use-cases/product/seed-products.use-case';
import { seedProductsRepository } from '@/infrastructure/mongo/repositories/product/product-default.repository';
import SeedProductController from '@/presentation/controllers/product/seed-product.controller';
import GenericSuccessResponse from '@/presentation/responses/generic-success.response';

const seedProductsControllerFactory = () => {
  const seedProductsUseCase = new SeedProductsUseCase(seedProductsRepository);
  const seedProductsPresenter = new GenericSuccessResponse<{
    message: string;
  }>();
  const seedProductsController = new SeedProductController(
    seedProductsUseCase,
    seedProductsPresenter
  );

  return { seedProductsController };
};

export default seedProductsControllerFactory;
