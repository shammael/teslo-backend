/* eslint-disable @typescript-eslint/no-unsafe-call */
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const setupGlobalMiddlewares = (app: Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};

export default setupGlobalMiddlewares;
