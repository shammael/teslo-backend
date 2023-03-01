import {
  ICreateUserRepository,
  IGetUserRepository,
  ISeedUserRepository,
} from '@/application/ports/repositories/user';
import { TGetUserRepositoryRequest } from '@/application/ports/repositories/user/get-user.repository';
import ILoginRepository from '@/application/ports/repositories/auth/login.repository';
import { IUser } from '@/domain/models/user/user.model';
import UserModel from './user.model';
import { ILogoutRepository } from '@/application/ports/repositories/auth';

class UserRepository
  implements
    ISeedUserRepository,
    IGetUserRepository,
    ILoginRepository,
    ILogoutRepository,
    ICreateUserRepository
{
  async create({
    email,
    name,
    hashedPassword,
  }: Omit<IUser, '_id' | 'login' | 'token' | 'role' | 'password'> & {
    hashedPassword: string;
  }): Promise<IUser> {
    const userDB = new UserModel({
      email,
      name,
      password: hashedPassword,
    });

    await userDB.save();

    return {
      email,
      name,
      role: userDB.role,
      _id: userDB._id,
    };
  }

  async logout(id: string): Promise<IUser | null> {
    const user = await UserModel.findByIdAndUpdate(id, {
      token: null,
      login: false,
    }).lean();
    return user;
  }

  async get(data: TGetUserRepositoryRequest): Promise<IUser | null> {
    const userDB = await UserModel.findOne(data).lean();
    return userDB;
  }

  async login(
    email: string,
    hashedPassword: string,
    token: string
  ): Promise<IUser | null> {
    const userDB = await UserModel.findOneAndUpdate(
      {
        email,
        password: hashedPassword,
      },
      { login: true, token }
    );

    return userDB;
  }

  async seed(users: IUser[]): Promise<boolean> {
    await UserModel.deleteMany();
    await UserModel.insertMany(users);
    return true;
  }
}

export default UserRepository;
