import {
  ICreateUserRepository,
  IGetUserRepository,
  ISeedUserRepository,
} from '@/application/ports/repositories/user';
import ILoginRepository from '@/application/ports/repositories/auth/login.repository';
import UserRepository from './user.repository';
import { ILogoutRepository } from '@/application/ports/repositories/auth';

const userRepository = new UserRepository();

const seedUsersRepository: ISeedUserRepository = userRepository;
const getUserRepository: IGetUserRepository = userRepository;
const loginRepository: ILoginRepository = userRepository;
const logoutRepository: ILogoutRepository = userRepository;
const createUserRepository: ICreateUserRepository = userRepository;

export {
  seedUsersRepository,
  getUserRepository,
  loginRepository,
  logoutRepository,
  createUserRepository,
};
