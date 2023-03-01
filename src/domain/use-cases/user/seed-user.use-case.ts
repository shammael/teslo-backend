import { IUser } from '@/domain/models/user/user.model';

interface ISeedUserUseCase {
  seed(users: IUser[]): Promise<boolean>;
}

export default ISeedUserUseCase;
