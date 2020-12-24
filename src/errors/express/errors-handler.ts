import { Response, Request, NextFunction } from 'express';
import { BadRequest } from '../bad-request';
import { CustomError } from '../custom-error';
import { DatabaseError } from '../external/db-error';
import { InternalServerError } from '../internal-server-error';

const skipCustomErrors = (handler: (err, req: Request, res: Response, next: NextFunction) => void) => {
    return (err, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof CustomError) {
            return next(err);
        }

        return handler(err, req, res, next);
    };
};

const databaseErrorHandler = skipCustomErrors((err, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof DatabaseError) {
        return next(InternalServerError.fromError(err));
    }

    return next(err);
});

const convertors = [
    {
        name:'joi',
        predicate: (err)=> err?.error?.isJoi,
        map:(err)=>BadRequest.fromJoi(err)
    }
]
const joiValidatorHandler = skipCustomErrors((err, req: Request, res: Response, next: NextFunction) => {
    const isJoiError = err?.error?.isJoi;

    if (isJoiError) {
        return next(BadRequest.fromJoi(err));
    }

    return next(err);
});

const expressValidatorHandler = skipCustomErrors((err, req: Request, res: Response, next: NextFunction) => {
    const isExpressValidatorError = err.array && err.throw && err.formatWith;

    if (isExpressValidatorError) {
        return next(BadRequest.fromExpressVaidator(err));
    }

    return next(err);
});

const unknownErrorHandler = skipCustomErrors((err, req: Request, res: Response, next: NextFunction) => {
    next(InternalServerError.fromError(err));
});

const customErrorsHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    let response;

    if (process.env.NODE_ENV === 'development') {
        response = { errors: err.serialize(), stack: err.stack };
    } else {
        response = { errors: err.serialize() };
    }

    res.status(err.statusCode).json(response);
};

const errorsHandler = [databaseErrorHandler, joiValidatorHandler, expressValidatorHandler, unknownErrorHandler, customErrorsHandler];

export { errorsHandler };
