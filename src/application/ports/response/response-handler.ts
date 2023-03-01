import IResponseModel from './response-model';

export interface ICookie {
  name: string;
  data: string;
  options: {
    httpOnly: boolean;
    maxAge: number;
  };
}

export type TCookieOptions = {
  setCookie?: ICookie;
  clearCookie?: Omit<ICookie, 'data'>;
};

interface IResponseHander<T = unknown> {
  response(args: {
    body?: T;
    cookieOptions?: TCookieOptions;
  }): Promise<IResponseModel<T>>;
}

export default IResponseHander;
