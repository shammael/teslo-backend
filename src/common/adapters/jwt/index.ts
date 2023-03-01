/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { IToken } from '@/application/ports/security';
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';

class JWTAdapater implements IToken {
  verify<T>(data: string, secret: string, options?: VerifyOptions): unknown {
    return jwt.verify(data, secret, options);
  }

  sign(
    data: string | object | Buffer,
    secret: string,
    options?: SignOptions
  ): string {
    return jwt.sign(data, secret, options);
  }
}

export default JWTAdapater;
