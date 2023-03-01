import {
  createUserControllerFactory,
  seedUserControllerFactory,
} from '@/main/factories/user';
import { Router } from 'express';
import expressAdapter from '../../adapters/express-route.adapter';

const userRoutes = Router();

const { seedUserController } = seedUserControllerFactory();
const { createUserController } = createUserControllerFactory();

userRoutes.get('/seed', expressAdapter(seedUserController));
userRoutes.post('/signup', expressAdapter(createUserController));

export default userRoutes;
