import IResponseHander, {
  TCookieOptions,
} from '@/application/ports/response/response-handler';
import IResponseModel from '@/application/ports/response/response-model';

class GenericSuccessResponse<T = unknown> implements IResponseHander {
  response({
    body,
    cookieOptions: opts,
  }: {
    body: T;
    cookieOptions?: TCookieOptions;
  }): Promise<IResponseModel<T>> {
    return new Promise((resolve) => {
      resolve({
        body: body,
        statusCode: 200,
        cookieOptions: opts,
      });
    });
  }
}

export default GenericSuccessResponse;
