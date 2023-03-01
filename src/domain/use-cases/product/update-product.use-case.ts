import IProduct from '@/domain/models/product/product.model';
import { TUpdateProduct } from '@/domain/models/product/request';

interface TUpdateProductSlug extends TUpdateProduct {
  id: string;
}

interface IUpdateProduct {
  update(id: string, updateData: TUpdateProductSlug): Promise<IProduct> | never;
}

export default IUpdateProduct;
