import createProductControllerFactory from '@/main/factories/product/create-product.controller-factory';
import getProductBySlugControllerFactory from '@/main/factories/product/get-product-by-slug.controller-factory';
import getProductsControllerFactory from '@/main/factories/product/get-products.controller-factory';
import searchProductControllerFactory from '@/main/factories/product/search-product.controller-factory';
import seedProductsControllerFactory from '@/main/factories/product/seed-product.controller-factory';
import { Router } from 'express';
import expressAdapter from '../../adapters/express-route.adapter';

const productRoutes = Router();

const { createdProductController } = createProductControllerFactory();
const { getProductsController } = getProductsControllerFactory();
const { seedProductsController } = seedProductsControllerFactory();
const { getProductBySlugController } = getProductBySlugControllerFactory();
const { searchProductController } = searchProductControllerFactory();

productRoutes.post('/', expressAdapter(createdProductController));
productRoutes.get('/', expressAdapter(getProductsController));
productRoutes.post('/seed', expressAdapter(seedProductsController));
productRoutes.get('/search', expressAdapter(searchProductController));
productRoutes.get('/:slug', expressAdapter(getProductBySlugController));

export default productRoutes;
