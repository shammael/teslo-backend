import ISeedProductsRepository from '@/application/ports/repositories/product/seed-products.repository';
import IProduct from '@/domain/models/product/product.model';
import { ISeedProductsUseCase } from '@/domain/use-cases';

class SeedProductsUseCase implements ISeedProductsUseCase {
  constructor(
    private readonly seedProductsRepository: ISeedProductsRepository
  ) {}

  seed(product: IProduct[]): Promise<boolean> {
    return this.seedProductsRepository.seed(product);
  }
}

export default SeedProductsUseCase;
