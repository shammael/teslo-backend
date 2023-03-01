class DefaultApplicationError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.messages = [];
        this.message = message || this.name;
        this.name = 'DefaultApplicationError';
        this.messages.push(this.message);
    }
}
export default DefaultApplicationError;
