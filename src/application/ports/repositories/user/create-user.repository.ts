import { IUser } from '@/domain/models/user/user.model';

interface ICreateUserRepository {
  create(
    userData: Omit<IUser, '_id' | 'login' | 'token' | 'role' | 'password'> & {
      hashedPassword: string;
    }
  ): Promise<IUser>;
}

export default ICreateUserRepository;
