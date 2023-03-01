export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  password?: string;
  login?: boolean;
  token?: string;
}
