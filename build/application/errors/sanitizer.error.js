import DefaultApplicationError from './default-application.error';
class SanitizerError extends DefaultApplicationError {
    constructor() {
        super(...arguments);
        this.name = 'SanitizerError';
        this.statusCode = 400;
    }
}
export default SanitizerError;
