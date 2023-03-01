import DefaultApplicationError from './default-application.error';
class ExistError extends DefaultApplicationError {
    constructor() {
        super(...arguments);
        this.statusCode = 409;
        this.name = 'Exist Error';
        // constructor(private readonly field: string) {
        //   super();
        // }
    }
}
export default ExistError;
