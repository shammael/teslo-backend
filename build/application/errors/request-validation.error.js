import DefaultApplicationError from './default-application.error';
class RequestValidationError extends DefaultApplicationError {
    constructor() {
        super(...arguments);
        this.statusCode = 400;
        this.name = 'RequestValidationError';
    }
}
export default RequestValidationError;
