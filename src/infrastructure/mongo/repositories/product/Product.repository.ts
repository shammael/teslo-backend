/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import IPaginate from '@/application/ports/paginate/paginate';
import {
  ICreateProductRepository,
  IGetProductsRepository,
  ISearchProductsRepository,
} from '@/application/ports/repositories/product';
import IGetProductBySlugRepository from '@/application/ports/repositories/product/find-product-by-slug.repository';
import ISeedProductsRepository from '@/application/ports/repositories/product/seed-products.repository';
import IProduct from '@/domain/models/product/product.model';
import { TCreateProduct } from '@/domain/models/product/request';
import { ObjectId, PaginateResult } from 'mongoose';
import ProductModel, { IProductDocument } from './product.model';

class ProductRepository
  implements
    ICreateProductRepository,
    IGetProductBySlugRepository,
    IGetProductsRepository,
    ISeedProductsRepository,
    ISearchProductsRepository
{
  async search(query: string): Promise<IPaginate<IProduct>> {
    const products: PaginateResult<IProductDocument & { _id: ObjectId }> =
      await ProductModel.paginate(
        {
          $text: { $search: query },
        },
        { lean: true }
      );

    return products as unknown as IPaginate<IProduct>;
  }

  async seed(products: IProduct[]): Promise<boolean> {
    await ProductModel.deleteMany();
    await ProductModel.insertMany(products);
    return true;
  }

  async getAll(
    query: string,
    options: {
      page: number;
      limit: number;
      pagination?: boolean;
    } = {
      limit: 10,
      page: 0,
      pagination: true,
    }
  ): Promise<IPaginate<IProduct>> {
    let products: PaginateResult<IProductDocument & { _id: ObjectId }>;
    if (query === 'all') {
      products = await ProductModel.paginate(
        {},
        {
          lean: true,
          page: options.page,
          limit: options.limit,
          pagination: options.pagination ?? true,
        }
      );
    } else {
      products = await ProductModel.paginate(
        { gender: query },
        {
          lean: true,
          page: options.page,
          limit: options.limit,
          pagination: options.pagination ?? true,
        }
      );
    }

    return products as unknown as IPaginate<IProduct>;
  }

  async get(slug: string): Promise<IProduct | null> {
    const product = await ProductModel.findOne({ slug }).lean();

    if (!product) {
      return null;
    }

    return product;
  }

  async create({
    description,
    gender,
    images,
    inStock,
    price,
    sizes,
    tags,
    title,
    type,
    slug,
  }: TCreateProduct): Promise<IProduct> | never {
    const product = new ProductModel({
      title,
      type,
      description,
      gender,
      images,
      inStock,
      price,
      slug,
      tags,
      sizes,
    });

    const result = await product.save();

    return result;
  }
}

export default ProductRepository;
