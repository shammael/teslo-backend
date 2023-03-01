import IPaginate from '@/application/ports/paginate/paginate';
import IProduct from '@/domain/models/product/product.model';

interface ISearchProductUseCase {
  search(query: string): Promise<IPaginate<IProduct>>;
}

export default ISearchProductUseCase;
