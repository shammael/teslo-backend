import IProduct from '@/domain/models/product/product.model';

interface ISeedProductsRepository {
  seed(products: IProduct[]): Promise<boolean>;
}

export default ISeedProductsRepository;
