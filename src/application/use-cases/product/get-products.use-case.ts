import IPaginate from '@/application/ports/paginate/paginate';
import { IGetProductsRepository } from '@/application/ports/repositories/product';
import IProduct from '@/domain/models/product/product.model';
import { IGetProductsUseCase } from '@/domain/use-cases';

class GetProductsUseCase implements IGetProductsUseCase {
  constructor(private getProductsRepository: IGetProductsRepository) {}

  async getAll(
    query: string,
    options: {
      page: number;
      limit: number;
      pagination?: boolean;
    }
  ): Promise<IPaginate<IProduct>> {
    const products = await this.getProductsRepository.getAll(query, options);
    return products;
  }
}

export default GetProductsUseCase;
