import createProductControllerFactory from '@/main/factories/product/create-product.controller-factory';
import { Router } from 'express';
import expressAdapter from '../../adapters/express-route.adapter';
const productRoutes = Router();
const { createdProductController } = createProductControllerFactory();
productRoutes.post('/', expressAdapter(createdProductController));
export default productRoutes;
