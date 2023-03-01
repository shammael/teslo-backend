import IProduct from '@/domain/models/product/product.model';

interface ISeedProductsUseCase {
  seed(product: IProduct[]): Promise<boolean>;
}

export default ISeedProductsUseCase;
