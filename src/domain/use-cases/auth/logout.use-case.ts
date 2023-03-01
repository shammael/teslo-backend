interface ILogoutUseCase {
  logout(tokenRequest: string): Promise<boolean>;
}

export default ILogoutUseCase;
