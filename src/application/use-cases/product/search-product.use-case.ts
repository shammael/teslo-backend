import IPaginate from '@/application/ports/paginate/paginate';
import { ISearchProductsRepository } from '@/application/ports/repositories/product';
import IProduct from '@/domain/models/product/product.model';
import { ISearchProductUseCase } from '@/domain/use-cases';

class SearchProductUseCase implements ISearchProductUseCase {
  constructor(
    private readonly searchProductRepository: ISearchProductsRepository
  ) {}

  search(query: string): Promise<IPaginate<IProduct>> {
    return this.searchProductRepository.search(query);
  }
}

export default SearchProductUseCase;
