interface IRequestModel<
  Body = unknown,
  Params = unknown,
  Query = unknown,
  Headers = unknown,
  Cookie = unknown
> {
  body?: Record<keyof Body, string>;
  params?: Params;
  query?: Query;
  headers?: Headers;
  cookie?: Cookie;
}

export default IRequestModel;
