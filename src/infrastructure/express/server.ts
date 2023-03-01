import dotenv from 'dotenv';
import express from 'express';
import setupApp from './setup/setup-routes';
import { connect } from '@/infrastructure/mongo/db';
import setupAsyncError from './setup/setup-async-error';
import setupGlobalMiddlewares from './setup/setup-global-middlewares';

dotenv.config();

const app = express();

setupGlobalMiddlewares(app);
setupApp(app);
setupAsyncError(app);

app.listen(process.env.PORT || 4000, async () => {
  await connect();
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
