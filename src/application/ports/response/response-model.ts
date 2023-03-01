import { TCookieOptions } from './response-handler';

interface IResponseModel<T> {
  body?: T;
  statusCode: number;
  cookieOptions?: TCookieOptions;
}

export default IResponseModel;
