import IResponseModel from '../ports/response/response-model';

type ErrorParams = {
  name?: string;
  statusCode?: string;
  messages?: IMessage[];
  stack?: Error['stack'];
};

type IMessage = { field: string; message: string } | { message: string };

type ErrorResponseModel = Omit<IResponseModel<ErrorParams>, 'body'>;

class DefaultApplicationError extends Error implements ErrorResponseModel {
  statusCode = 500;

  messages: IMessage[] = [];

  constructor(message?: string) {
    super(message);
    this.message = message || this.name;
    this.name = 'DefaultApplicationError';
  }
}

export default DefaultApplicationError;
