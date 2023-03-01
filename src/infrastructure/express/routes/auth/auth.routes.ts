import {
  loginControllerFactory,
  logoutControllerFactory,
  refreshTokenControllerFactory,
} from '@/main/factories/auth';
import { Router } from 'express';
import expressAdapter from '../../adapters/express-route.adapter';

const authRoutes = Router();

const { refreshTokenController } = refreshTokenControllerFactory();
const { loginController } = loginControllerFactory();
const { logoutController } = logoutControllerFactory();

authRoutes.get('/refresh', expressAdapter(refreshTokenController));
authRoutes.post('/login', expressAdapter(loginController));
authRoutes.put('/logout', expressAdapter(logoutController));

export default authRoutes;
