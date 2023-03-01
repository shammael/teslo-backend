import { ExistError } from '@/application/errors';
import { ICreateUserRepository, IGetUserRepository } from '@/application/ports';
import { IEncryptService } from '@/application/ports/security';
import { IUser } from '@/domain/models/user/user.model';
import { ICreateUserUseCase } from '@/domain/use-cases';

class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly createUserRepository: ICreateUserRepository,
    private readonly getUserRepository: IGetUserRepository,
    private readonly encryptService: IEncryptService
  ) {}

  async create(
    userData: Omit<IUser, 'role' | '_id' | 'token' | 'login'>
  ): Promise<{ message: string }> {
    const userDB = await this.getUserRepository.get({ email: userData.email });
    if (userDB) {
      const err = new ExistError('Not available');
      err.messages.push({
        field: 'email',
        message: 'Correo no disponible, por favor escoge otro',
      });
      throw err;
    }
    await this.createUserRepository.create({
      email: userData.email,
      hashedPassword: await this.encryptService.hash(
        userData?.password as string
      ),
      name: userData.name,
    });

    return { message: 'Cuenta creada con éxito' };
  }
}

export default CreateUserUseCase;
