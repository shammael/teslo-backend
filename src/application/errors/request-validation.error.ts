import DefaultApplicationError from './default-application.error';

class RequestValidationError extends DefaultApplicationError {
  statusCode = 400;

  name = 'RequestValidationError';
}

export default RequestValidationError;
