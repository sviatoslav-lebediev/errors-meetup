import { Router, Request, Response, NextFunction } from 'express';

const indexRouter = Router();

indexRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    next(new Error('controller general error -> internal error'));
});

export { indexRouter };
