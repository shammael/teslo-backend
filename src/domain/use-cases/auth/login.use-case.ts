import { IUser } from '@/domain/models/user/user.model';

export interface IUserWithToken {
  user: IUser;
  token: string;
}

interface ILoginUseCase {
  login(
    userData: Pick<IUser, 'email' | 'password'>
  ): Promise<{ userWithToken: IUserWithToken; refreshToken: string }>;
}

export default ILoginUseCase;
