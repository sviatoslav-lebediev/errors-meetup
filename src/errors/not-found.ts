import { CustomError } from './custom-error';

class NotFound extends CustomError {
    statusCode = 404;

    constructor(message = 'Not found') {
        super(message);
    }

    serialize() {
        return [{ message: this.message }];
    }
}

export { NotFound };
