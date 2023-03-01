var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { describe, expect, it, vi } from 'vitest';
import ProductRepository from './Product.repository';
import ProductModel from './product.model';
import slugify from '@/utils/slugify';
const modelFindResponseMock = (product) => {
    return {
        lean: () => {
            return new Promise((resolve, reject) => {
                resolve(product);
            });
        },
    };
};
const findResponse = (slug) => ({
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
        it('should call find method with a specific slug', () => __awaiter(void 0, void 0, void 0, function* () {
            const { sut, model, requestSlug } = sutFactory();
            const findMethodSpy = vi
                .spyOn(model, 'findOne')
                .mockImplementationOnce(modelFindResponseMock);
            yield sut.find(requestSlug.slug);
            expect(findMethodSpy).toBeCalledWith(requestSlug);
        }));
        it('should return a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const { sut, requestSlug, responseFind, model } = sutFactory();
            model.findOne = vi.fn().mockImplementation(() => ({
                lean: vi.fn().mockResolvedValueOnce(responseFind),
            }));
            const result = yield sut.find(requestSlug.slug);
            expect(result).toEqual(responseFind);
        }));
    });
    describe('Check create method', () => {
        it('should call the save method with the right parameters', () => __awaiter(void 0, void 0, void 0, function* () {
            const { sut, responseFind, productRequest, model } = sutFactory();
            vi.spyOn(ProductModel.prototype, 'save').mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    resolve(responseFind);
                });
            });
            const result = yield sut.create(productRequest);
            expect(result).toEqual(responseFind);
        }));
    });
});
