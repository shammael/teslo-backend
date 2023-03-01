import { productRoutes } from '../routes/product';
const setupApp = (app) => {
    app.use('/product', productRoutes);
};
export default setupApp;
