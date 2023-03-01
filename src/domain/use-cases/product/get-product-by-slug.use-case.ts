import IProduct from '@/domain/models/product/product.model';

interface IGetProductBySlugUseCase {
  get(slug: string): Promise<IProduct | null>;
}

export default IGetProductBySlugUseCase;
