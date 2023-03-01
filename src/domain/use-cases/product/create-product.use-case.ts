import IProduct from '../../models/product/product.model';
import { TCreateProduct } from '../../models/product/request';

interface ICreateProductUseCase {
  create(productData: TCreateProduct): Promise<IProduct> | never;
}

export default ICreateProductUseCase;
