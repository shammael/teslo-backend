/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { describe, expect, it, vi } from 'vitest';
import ProductRepository from './Product.repository';
import ProductModel from './product.model';
import IProduct from '@/domain/models/product/product.model';
import slugify from '@/common/slugify';
import { TCreateProduct } from '@/domain/models/product/request';

type TfindLean<T> = {
  lean: () => Promise<T>;
};

const modelFindResponseMock = (product: IProduct): TfindLean<IProduct> => {
  return {
    lean: () => {
      return new Promise((resolve, reject) => {
        resolve(product);
      });
    },
  };
};

const findResponse = (slug: string): IProduct => ({
  _id: '1',
  createdAt: new Date().toString(),
  description: 'hola dev',
  gender: 'kid',
  images: ['hola.jpg', 'test.jpg'],
  inStock: 22,
  price: 45,
  sizes: ['L', 'XL'],
  slug,
  tags: ['short', 'pants'],
  title: 'family-brand',
  type: 'hats',
  updatedAt: new Date().toString(),
});

const productCreateRequest = (): TCreateProduct => {
  return {
    description: 'test 24 errt',
    gender: 'kid',
    images: ['hola'],
    inStock: 2,
    price: 20,
    sizes: ['XS'],
    title: 'Guccy exchange data',
    tags: ['Guccy', 'brand', 'new', '2023'],
    type: 'shirts',
    slug: slugify('Guccy exchange data'),
  };
};

const sutFactory = () => {
  const sut = new ProductRepository();
  const model = ProductModel;
  const requestSlug = { slug: slugify('family-brand') };
  const responseFind = findResponse(requestSlug.slug);
  const modelResponseFind = modelFindResponseMock(responseFind).lean();
  const productRequest = productCreateRequest();

  return {
    sut,
    model,
    modelResponseFind,
    responseFind,
    requestSlug,
    productRequest,
  };
};

describe('ProductRepository', () => {
  describe('Check findBySlug method', () => {
    it('should call find method with a specific slug', async () => {
      const { sut, model, requestSlug } = sutFactory();
      const findMethodSpy = vi
        .spyOn(model, 'findOne')
        .mockImplementationOnce(modelFindResponseMock as any);

      await sut.find(requestSlug.slug);

      expect(findMethodSpy).toBeCalledWith(requestSlug);
    });
    it('should return a product', async () => {
      const { sut, requestSlug, responseFind, model } = sutFactory();

      model.findOne = vi.fn().mockImplementation(() => ({
        lean: vi.fn().mockResolvedValueOnce(responseFind),
      }));

      const result = await sut.find(requestSlug.slug);

      expect(result).toEqual(responseFind);
    });
  });

  describe('Check create method', () => {
    it('should call the save method with the right parameters', async () => {
      const { sut, responseFind, productRequest, model } = sutFactory();
      vi.spyOn(ProductModel.prototype, 'save').mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(responseFind);
        });
      });
      const result = await sut.create(productRequest);

      expect(result).toEqual(responseFind);
    });
  });
});
