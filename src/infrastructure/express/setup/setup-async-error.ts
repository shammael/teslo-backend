import DefaultApplicationError from '@/application/errors/default-application.error';
import { Application, NextFunction, Request, Response } from 'express';

const setupAsyncError = (app: Application) => {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (!error) {
      return next();
    }
    if (!(error instanceof DefaultApplicationError)) {
      return res.status(500).json({
        error: error.name,
        message: 'Something went wrong',
        statusCode: 500,
        messages: ['Something went wrong'],
      });
    }
    return res.status(error.statusCode).json({
      error: error.name,
      message: error.message,
      statusCode: error.statusCode,
      messages: error.messages,
    });
  });
};

export default setupAsyncError;
