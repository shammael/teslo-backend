import IProduct from '@/domain/models/product/product.model';
import { TCreateProduct } from '@/domain/models/product/request';

interface ICreateProductRepository {
  create(productData: TCreateProduct): Promise<IProduct> | never;
}

export default ICreateProductRepository;
