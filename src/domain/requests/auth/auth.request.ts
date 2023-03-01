import { IRequestModel } from '@/application/ports';

type TAuthRequestModel = IRequestModel<
  unknown,
  unknown,
  unknown,
  unknown,
  { jwt: string }
>;

export default TAuthRequestModel;
