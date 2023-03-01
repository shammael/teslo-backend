import DefaultApplicationError from './default-application.error';

class UnauthorizedError extends DefaultApplicationError {
  name = 'Unauthorized';

  statusCode = 401;
}

export default UnauthorizedError;
