import {
  ICreateProductRepository,
  IGetProductsRepository,
  ISearchProductsRepository,
} from '@/application/ports/repositories/product';
import IGetProductBySlugRepository from '@/application/ports/repositories/product/find-product-by-slug.repository';
import ISeedProductsRepository from '@/application/ports/repositories/product/seed-products.repository';
import ProductRepository from './Product.repository';

const productRepository = new ProductRepository();

const createProductRepository: ICreateProductRepository = productRepository;
const getProductBySlugRepository: IGetProductBySlugRepository =
  productRepository;
const getProductsRepository: IGetProductsRepository = productRepository;
const seedProductsRepository: ISeedProductsRepository = productRepository;
const searchProductsRepository: ISearchProductsRepository = productRepository;

export {
  createProductRepository,
  getProductBySlugRepository,
  getProductsRepository,
  seedProductsRepository,
  searchProductsRepository,
};
