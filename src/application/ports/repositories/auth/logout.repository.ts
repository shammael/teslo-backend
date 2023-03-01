import { IUser } from '@/domain/models/user/user.model';

interface ILogoutRepository {
  logout(id: string): Promise<IUser | null>;
}

export default ILogoutRepository;
