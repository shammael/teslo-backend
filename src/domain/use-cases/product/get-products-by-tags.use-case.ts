import IProduct from '@/domain/models/product/product.model';

interface IGetProductsByTags {
  get(tags: string[]): Promise<IProduct[]> | never;
}

export default IGetProductsByTags;
