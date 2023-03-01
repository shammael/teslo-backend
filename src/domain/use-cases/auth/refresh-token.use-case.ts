interface IRefreshTokenUseCase {
  refresh(tokenRequest: string): Promise<string>;
}

export default IRefreshTokenUseCase;
