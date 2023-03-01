/* eslint-disable max-classes-per-file */
import { ExistError } from '@/application/errors';
import {
  ICreateProductRepository,
  IFindProductBySlugRepository,
} from '@/application/ports/repositories/product';
import IProduct from '@/domain/models/product/product.model';
import { TCreateProduct } from '@/domain/models/product/request';
import slugify from '@/common/slugify';
import { describe, expect, it, vi } from 'vitest';
import CreateProductUseCase from './create-product.use-case';

const findProductRepositoryMockFactory = () => {
  class FindProductRepositoryMock implements IFindProductBySlugRepository {
    find(slug: string): Promise<IProduct | null> {
      return new Promise((resolve, reject) => {
        resolve(null);
      });
    }
  }
  return new FindProductRepositoryMock();
};

const createProductRepositoryMockFactory = () => {
  class CreateProductRepositoryMock implements ICreateProductRepository {
    create(productData: TCreateProduct): Promise<IProduct> {
      return new Promise((resolve, reject) => {
        resolve({
          _id: '1',
          ...productData,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
        });
      });
    }
  }

  return new CreateProductRepositoryMock();
};

const productCreateRequest = (): TCreateProduct => {
  return {
    description: 'test 24 errt',
    gender: 'kid',
    images: ['hola'],
    inStock: 2,
    price: 20,
    sizes: ['XS'],
    slug: slugify('Guccy exchange data'),
    title: 'Guccy exchange data',
    tags: ['Guccy', 'brand', 'new', '2023'],
    type: 'shirts',
  };
};

const productCreateResponse = (product: TCreateProduct): IProduct => ({
  _id: '1',
  ...product,
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
});

const sutFactory = () => {
  const productRequest = productCreateRequest();
  const productResponse = productCreateResponse(productRequest);
  const createProductRepositoryMock = createProductRepositoryMockFactory();
  const findProductRepositoryMock = findProductRepositoryMockFactory();
  const sut = new CreateProductUseCase(
    createProductRepositoryMock,
    findProductRepositoryMock
  );

  return {
    sut,
    productRequest,
    findProductRepositoryMock,
    createProductRepositoryMock,
    productResponse,
  };
};

describe('Create product [use-case]', () => {
  describe('Check getProductRepo calls', () => {
    it('should call getProductRepository one time', async () => {
      const { sut, productRequest, findProductRepositoryMock } = sutFactory();
      const findProductRepositorySpy = vi.spyOn(
        findProductRepositoryMock,
        'find'
      );

      // Act
      await sut.create(productRequest);

      // Expect
      expect(findProductRepositorySpy).toBeCalledTimes(1);
    });
    it('should call getProductRepository with the right value', async () => {
      const { sut, productRequest, findProductRepositoryMock } = sutFactory();
      const findProductRepositorySpy = vi.spyOn(
        findProductRepositoryMock,
        'find'
      );

      await sut.create(productRequest);

      expect(findProductRepositorySpy).toBeCalledWith(productRequest.slug);
    });
  });

  describe('throw error if product not found', () => {
    it('should throw an error if a product was found', () => {
      const {
        sut,
        productRequest,
        findProductRepositoryMock,
        productResponse,
      } = sutFactory();

      vi.spyOn(findProductRepositoryMock, 'find').mockResolvedValueOnce(
        productResponse
      );

      sut.create(productRequest).catch((error) => {
        return expect(error).toBeDefined();
      });
    });

    it('should throw a specific error if an error is throw', () => {
      const {
        sut,
        productRequest,
        findProductRepositoryMock,
        productResponse,
      } = sutFactory();

      vi.spyOn(findProductRepositoryMock, 'find').mockResolvedValueOnce(
        productResponse
      );

      sut.create(productRequest).catch((error) => {
        return expect(error).toBeInstanceOf(ExistError);
      });
    });
    it('should throw a specific error message if an error is throw', () => {
      const {
        sut,
        productRequest,
        findProductRepositoryMock,
        productResponse,
      } = sutFactory();

      vi.spyOn(findProductRepositoryMock, 'find').mockResolvedValueOnce(
        productResponse
      );

      sut.create(productRequest).catch((error: Error) => {
        return expect(error.message).toBe('Slug no disponible');
      });
    });
  });

  describe('check createRepository create function', () => {
    it('should check if create function from createProductRepository have been called', async () => {
      const { sut, createProductRepositoryMock, productRequest } = sutFactory();
      const createProductRepositorySpy = vi.spyOn(
        createProductRepositoryMock,
        'create'
      );
      await sut.create(productRequest);

      expect(createProductRepositorySpy).toBeCalled();
    });

    it('should check if create function from createProductRepository have been called one time', async () => {
      const { sut, createProductRepositoryMock, productRequest } = sutFactory();
      const createProductRepositorySpy = vi.spyOn(
        createProductRepositoryMock,
        'create'
      );
      await sut.create(productRequest);

      expect(createProductRepositorySpy).toHaveBeenCalledTimes(1);
    });

    it('should check if create function have been called with the right paramters', async () => {
      const { sut, createProductRepositoryMock, productRequest } = sutFactory();
      const createProductRepositorySpy = vi.spyOn(
        createProductRepositoryMock,
        'create'
      );
      await sut.create(productRequest);
      expect(createProductRepositorySpy).toHaveBeenCalledWith(productRequest);
    });
  });
});
