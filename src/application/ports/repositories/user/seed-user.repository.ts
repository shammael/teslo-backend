import { IUser } from '@/domain/models/user/user.model';

interface ISeedUserRepository {
  seed(users: IUser[]): Promise<boolean>;
}

export default ISeedUserRepository;
