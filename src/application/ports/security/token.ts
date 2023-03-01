interface IToken {
  sign(data: unknown, secret: string, options: { expiresIn: string }): string;
  verify<T>(data: unknown, secret: string): unknown;
}

// TODO: Arreglar el método verify

export default IToken;
