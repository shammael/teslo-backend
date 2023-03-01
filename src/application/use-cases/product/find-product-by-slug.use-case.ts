import IGetProductBySlugRepository from '@/application/ports/repositories/product/find-product-by-slug.repository';
import IProduct from '@/domain/models/product/product.model';
import { IGetProductBySlugUseCase } from '@/domain/use-cases';

class GetProductBySlugUseCase implements IGetProductBySlugUseCase {
  constructor(
    private readonly getProductBySlugRepository: IGetProductBySlugRepository
  ) {}

  get(slug: string): Promise<IProduct | null> {
    return this.getProductBySlugRepository.get(slug);
  }
}

export default GetProductBySlugUseCase;
