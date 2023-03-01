import { IEncryptService } from '@/application/ports/security';
import bcrypt from 'bcryptjs';

class BcryptAdapter implements IEncryptService {
  private readonly saltRounds = 10;

  async compare(password: string, hash: string): Promise<boolean> {
    const valid = await bcrypt.compare(password, hash);
    return valid;
  }

  async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    return hashedPassword;
  }
}

export default BcryptAdapter;
