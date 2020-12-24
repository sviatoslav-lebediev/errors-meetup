type ErrorItem = {
    message: string;
    code?: string;
};

type SerializedErrors = ErrorItem[];

//metadata
//original error
//combine with https://www.npmjs.com/package/error
abstract class CustomError extends Error {
    abstract statusCode: number;
    isOperational = false;

    constructor(message: string, stack?: string) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    abstract serialize(): SerializedErrors;
}

export { CustomError, ErrorItem, SerializedErrors };
