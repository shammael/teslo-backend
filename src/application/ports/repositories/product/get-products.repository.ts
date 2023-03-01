import IProduct from '@/domain/models/product/product.model';
import IPaginate from '../../paginate/paginate';

interface IGetProductsRepository {
  getAll(
    query: string,
    options: {
      page: number;
      limit: number;
      pagination?: boolean;
    }
  ): Promise<IPaginate<IProduct>>;
}

export default IGetProductsRepository;
