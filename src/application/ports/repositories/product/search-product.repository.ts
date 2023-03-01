import IProduct from '@/domain/models/product/product.model';
import IPaginate from '../../paginate/paginate';

interface ISearchProductsRepository {
  search(query: string): Promise<IPaginate<IProduct>>;
}

export default ISearchProductsRepository;
