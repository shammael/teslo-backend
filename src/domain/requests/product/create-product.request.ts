import { IRequestModel } from '@/application/ports';
import { TCreateProduct } from '@/domain/models/product/request';

type TCreateProductRequest = IRequestModel<
  Record<keyof TCreateProduct, string>
>;

export default TCreateProductRequest;
