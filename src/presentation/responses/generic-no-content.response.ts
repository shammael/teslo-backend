import { IResponseHander, IResponseModel } from '@/application/ports';
import { TCookieOptions } from '@/application/ports/response/response-handler';

class GenericNoContentResponse<T> implements IResponseHander {
  response({
    cookieOptions: opts,
  }: {
    cookieOptions?: TCookieOptions;
  }): Promise<IResponseModel<T>> {
    return new Promise((resolve) => {
      resolve({
        statusCode: 204,
        cookieOptions: opts,
      });
    });
  }
}

export default GenericNoContentResponse;
