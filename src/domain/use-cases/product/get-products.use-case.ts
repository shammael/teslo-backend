import IPaginate from '@/application/ports/paginate/paginate';
import IProduct from '@/domain/models/product/product.model';

interface IGetProductsUseCase {
  getAll(
    query: string,
    options: {
      page: number;
      limit: number;
      pagination?: boolean;
    }
  ): Promise<IPaginate<IProduct>>;
}

export default IGetProductsUseCase;
