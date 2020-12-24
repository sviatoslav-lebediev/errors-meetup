import { ValidationError } from 'joi';
import { CustomError, ErrorItem } from './custom-error';

class BadRequest extends CustomError {
    statusCode = 400;
    isOperational = true;

    constructor(private errors: ErrorItem[], stack?: string) {
        super('Bad request', stack);
    }

    serialize() {
        return this.errors;
    }

    static fromExpressVaidator(err) {
        return new BadRequest(
            err.array().map(({ msg }) => ({ message: msg })),
            err.stack
        );
    }

    static fromJoi({ error }: { error: ValidationError }) {
        return new BadRequest(
            error.details.map(({ message }) => ({ message })),
            error.stack
        );
    }
}

export { BadRequest };
