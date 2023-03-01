import IRequestModel from '../request/request-model';
import IResponseModel from '../response/response-model';

interface IController<T = unknown> {
  handleRequest(requestModel: IRequestModel<T>): Promise<IResponseModel<T>>;
}

/* interface IController<Request = unknown, Response = unknown> {
  handleRequest(
    requestModel: IRequestModel<Request>
  ): Promise<IResponseModel<Response>>;
} */

export default IController;
