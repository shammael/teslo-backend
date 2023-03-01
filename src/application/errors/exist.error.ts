import DefaultApplicationError from './default-application.error';

class ExistError extends DefaultApplicationError {
  public readonly statusCode = 409;

  public readonly name = 'Exist Error';

  // constructor(private readonly field: string) {
  //   super();
  // }
}

export default ExistError;
