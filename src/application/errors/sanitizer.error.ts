import DefaultApplicationError from './default-application.error';

class SanitizerError extends DefaultApplicationError {
  name = 'SanitizerError';

  statusCode = 400;
}

export default SanitizerError;
