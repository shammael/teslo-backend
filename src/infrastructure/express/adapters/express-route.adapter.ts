/* eslint-disable @typescript-eslint/unbound-method */
import DefaultApplicationError from '@/application/errors/default-application.error';
import IController from '@/application/ports/controller/controller';
import { NextFunction, Request, Response } from 'express';

const expressAdapter = (controller: IController) => {
  return (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      controller
        .handleRequest({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          body: request.body,
          params: request.params,
          query: request.query,
          headers: request.headers,
        })
        .then((controllerResponse) => {
          if (controllerResponse.cookieOptions?.setCookie) {
            response
              .status(controllerResponse.statusCode)
              .cookie(
                controllerResponse?.cookieOptions?.setCookie.name,
                controllerResponse?.cookieOptions?.setCookie.data,
                controllerResponse?.cookieOptions.setCookie.options
              )
              .json(controllerResponse.body);
          } else if (controllerResponse.cookieOptions?.clearCookie) {
            response
              .status(controllerResponse.statusCode)
              .clearCookie(
                controllerResponse?.cookieOptions?.clearCookie?.name,
                controllerResponse?.cookieOptions?.clearCookie.options
              )
              .json(controllerResponse.body);
          } else {
            response
              .status(controllerResponse.statusCode)
              .json(controllerResponse.body);
          }

          return next();
        })
        .catch((error: DefaultApplicationError) => {
          return next(error);
        })
    );
  };
};

export default expressAdapter;
