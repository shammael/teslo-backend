import { IRequestModel } from '@/application/ports';
import { IUser } from '@/domain/models/user/user.model';

type TCreateUserRequestModel = IRequestModel<
  Pick<IUser, 'name' | 'password' | 'email'>
>;

export default TCreateUserRequestModel;
