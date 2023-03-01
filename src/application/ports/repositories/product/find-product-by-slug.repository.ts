import IProduct from '@/domain/models/product/product.model';

interface IGetProductBySlugRepository {
  get(slug: string): Promise<IProduct | null>;
}

export default IGetProductBySlugRepository;
