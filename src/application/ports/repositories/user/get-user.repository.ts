import { MappedType } from '@/common/helpers/interfaces';
import { IUser } from '@/domain/models/user/user.model';

export type TGetUserRepositoryRequest = MappedType<
  Partial<Omit<IUser, 'name' | 'password'>>
>;

interface IGetUserRepository {
  get(data: TGetUserRepositoryRequest): Promise<IUser | null>;
}

export default IGetUserRepository;
