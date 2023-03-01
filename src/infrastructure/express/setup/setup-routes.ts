import { Application } from 'express';
import { productRoutes, userRoutes } from '../routes';
import { authRoutes } from '../routes/auth';

const setupApp = (app: Application) => {
  app.use('/product', productRoutes);
  app.use('/user', userRoutes);
  app.use('/auth', authRoutes);
};

export default setupApp;
