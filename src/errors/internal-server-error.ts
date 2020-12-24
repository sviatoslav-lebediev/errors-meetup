import { CustomError } from './custom-error';

class InternalServerError extends CustomError {
    statusCode = 500;

    constructor(message = 'Internal server error') {
        super(message);
    }

    serialize() {
        return [{ message: this.message }];
    }

    static fromError(error) {
        return new InternalServerError(error.message);
    }
}

export { InternalServerError };
