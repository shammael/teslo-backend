import { IUser } from '@/domain/models/user/user.model';

interface ICreateUserUseCase {
  create(
    userData: Omit<IUser, 'role' | '_id' | 'token' | 'login'>
  ): Promise<{ message: string }>;
}

export default ICreateUserUseCase;
