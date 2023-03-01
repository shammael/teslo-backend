import { ExistError } from '@/application/errors';
import {
  ICreateProductRepository,
  IFindProductBySlugRepository,
} from '@/application/ports/repositories/product';
import IProduct from '@/domain/models/product/product.model';
import { TCreateProduct } from '@/domain/models/product/request';
import { ICreateProductUseCase } from '@/domain/use-cases';
import slugify from '@/common/slugify';

class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    private readonly createProductRepository: ICreateProductRepository,
    private readonly getProductBySlugRepository: IFindProductBySlugRepository
  ) {}

  async create(productData: TCreateProduct): Promise<IProduct> {
    const slug = slugify(productData.title);

    const productDB = await this.getProductBySlugRepository.get(slug);

    if (productDB) {
      throw new ExistError('Título no disponible');
    }

    const newProductDB = await this.createProductRepository.create({
      ...productData,
      slug,
    });
    return newProductDB;
  }
}

export default CreateProductUseCase;
