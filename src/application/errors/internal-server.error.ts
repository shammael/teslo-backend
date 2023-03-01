import DefaultApplicationError from './default-application.error';

class InternalServerError extends DefaultApplicationError {
  status = 500;

  name = 'Internal Server Error';
}

export default InternalServerError;
