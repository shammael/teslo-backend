import { IUser } from '@/domain/models/user/user.model';

interface ILoginRepository {
  login(
    email: string,
    hashedPassword: string,
    token: string
  ): Promise<IUser | null>;
}

export default ILoginRepository;
