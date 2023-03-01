import DefaultApplicationError from './default-application.error';

class NotFoundError extends DefaultApplicationError {
  status = 404;

  name = 'Not Found';
}

export default NotFoundError;
