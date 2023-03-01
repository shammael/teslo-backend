import IProduct from '@/domain/models/product/product.model';

interface IGetProductID {
  get(id: string): Promise<IProduct> | never;
}

export default IGetProductID;
