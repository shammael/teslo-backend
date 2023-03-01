import { IRequestModel } from '@/application/ports';

interface ILoginRequestModel {
  email: string;
  password: string;
}

type TLoginRequestModel = IRequestModel<ILoginRequestModel>;

export default TLoginRequestModel;
