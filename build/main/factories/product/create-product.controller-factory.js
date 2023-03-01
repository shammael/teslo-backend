import CreateProductUseCase from '@/application/use-cases/product/create-product.use-case';
import { createProductRepository, getProductBySlugRepository, } from '@/infrastructure/repositories/mongo/product/product-default.repository';
import { CreateProductController } from '@/presentation/controllers/product';
import { GenericCreatedResponse } from '@/presentation/responses';
const createProductControllerFactory = () => {
    const createProductPresenter = new GenericCreatedResponse();
    const createProductUseCase = new CreateProductUseCase(createProductRepository, getProductBySlugRepository);
    const createdProductController = new CreateProductController(createProductUseCase, createProductPresenter);
    return {
        createdProductController,
    };
};
export default createProductControllerFactory;
