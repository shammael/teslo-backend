interface IEncryptService {
  compare(password: string, hash: string): Promise<boolean>;
  hash(password: string): Promise<string>;
}

export default IEncryptService;
