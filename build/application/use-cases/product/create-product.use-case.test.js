var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ExistError } from '@/application/errors';
import slugify from '@/utils/slugify';
import { describe, expect, it, vi } from 'vitest';
import CreateProductUseCase from './create-product.use-case';
const findProductRepositoryMockFactory = () => {
    class FindProductRepositoryMock {
        find(slug) {
            return new Promise((resolve, reject) => {
                resolve(null);
            });
        }
    }
    return new FindProductRepositoryMock();
};
const createProductRepositoryMockFactory = () => {
    class CreateProductRepositoryMock {
        create(productData) {
            return new Promise((resolve, reject) => {
                resolve(Object.assign(Object.assign({ _id: '1' }, productData), { createdAt: new Date().toString(), updatedAt: new Date().toString() }));
            });
        }
    }
    return new CreateProductRepositoryMock();
};
const productCreateRequest = () => {
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
const productCreateResponse = (product) => (Object.assign(Object.assign({ _id: '1' }, product), { createdAt: new Date().toString(), updatedAt: new Date().toString() }));
const sutFactory = () => {
    const productRequest = productCreateRequest();
    const productResponse = productCreateResponse(productRequest);
    const createProductRepositoryMock = createProductRepositoryMockFactory();
    const findProductRepositoryMock = findProductRepositoryMockFactory();
    const sut = new CreateProductUseCase(createProductRepositoryMock, findProductRepositoryMock);
    return {
        sut,
        productRequest,
        findProductRepositoryMock,
        createProductRepositoryMock,
        productResponse,
    };
};
describe('Create product [use-case]', () => {
    describe('Check getProductRepo calls', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should call getProductRepository one time', () => __awaiter(void 0, void 0, void 0, function* () {
            const { sut, productRequest, findProductRepositoryMock } = sutFactory();
            const findProductRepositorySpy = vi.spyOn(findProductRepositoryMock, 'find');
            // Act
            yield sut.create(productRequest);
            // Expect
            expect(findProductRepositorySpy).toBeCalledTimes(1);
        }));
        it('should call getProductRepository with the right value', () => __awaiter(void 0, void 0, void 0, function* () {
            const { sut, productRequest, findProductRepositoryMock } = sutFactory();
            const findProductRepositorySpy = vi.spyOn(findProductRepositoryMock, 'find');
            yield sut.create(productRequest);
            expect(findProductRepositorySpy).toBeCalledWith(productRequest.slug);
        }));
    }));
    describe('throw error if product not found', () => {
        it('should throw an error if a product was found', () => {
            const { sut, productRequest, findProductRepositoryMock, productResponse, } = sutFactory();
            vi.spyOn(findProductRepositoryMock, 'find').mockResolvedValueOnce(productResponse);
            sut.create(productRequest).catch((error) => {
                return expect(error).toBeDefined();
            });
        });
        it('should throw a specific error if an error is throw', () => __awaiter(void 0, void 0, void 0, function* () {
            const { sut, productRequest, findProductRepositoryMock, productResponse, } = sutFactory();
            vi.spyOn(findProductRepositoryMock, 'find').mockResolvedValueOnce(productResponse);
            sut.create(productRequest).catch((error) => {
                return expect(error).toBeInstanceOf(ExistError);
            });
        }));
        it('should throw a specific error message if an error is throw', () => {
            const { sut, productRequest, findProductRepositoryMock, productResponse, } = sutFactory();
            vi.spyOn(findProductRepositoryMock, 'find').mockResolvedValueOnce(productResponse);
            sut.create(productRequest).catch((error) => {
                return expect(error.message).toBe('Slug no disponible');
            });
        });
    });
    describe('check createRepository create function', () => {
        it('should check if create function from createProductRepository have been called', () => __awaiter(void 0, void 0, void 0, function* () {
            const { sut, createProductRepositoryMock, productRequest } = sutFactory();
            const createProductRepositorySpy = vi.spyOn(createProductRepositoryMock, 'create');
            yield sut.create(productRequest);
            expect(createProductRepositorySpy).toBeCalled();
        }));
        it('should check if create function from createProductRepository have been called one time', () => __awaiter(void 0, void 0, void 0, function* () {
            const { sut, createProductRepositoryMock, productRequest } = sutFactory();
            const createProductRepositorySpy = vi.spyOn(createProductRepositoryMock, 'create');
            yield sut.create(productRequest);
            expect(createProductRepositorySpy).toHaveBeenCalledTimes(1);
        }));
        it('should check if create function have been called with the right paramters', () => __awaiter(void 0, void 0, void 0, function* () {
            const { sut, createProductRepositoryMock, productRequest } = sutFactory();
            const createProductRepositorySpy = vi.spyOn(createProductRepositoryMock, 'create');
            yield sut.create(productRequest);
            expect(createProductRepositorySpy).toHaveBeenCalledWith(productRequest);
        }));
    });
});
