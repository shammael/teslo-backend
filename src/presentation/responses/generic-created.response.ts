import IResponseHander, {
  TCookieOptions,
} from '@/application/ports/response/response-handler';
import IResponseModel from '@/application/ports/response/response-model';

class GenericCreatedResponse<T> implements IResponseHander {
  async response({
    body,
    cookieOptions: opts,
  }: {
    body: T;
    cookieOptions?: TCookieOptions;
  }): Promise<IResponseModel<T>> {
    return new Promise((resolve) => {
      resolve({
        statusCode: 201,
        body,
        cookieOptions: opts,
      });
    });
  }
}

export default GenericCreatedResponse;
