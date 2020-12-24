import express from 'express';
import 'express-async-errors';
import logger from 'express-pino-logger';
import { indexRouter } from './routes/index';
import { NotFound } from './errors';
import { usersRouter } from './routes/users';
import { errorsHandler } from './errors/express';

const app = express();

app.use(logger());
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => next(new NotFound()));
app.use(errorsHandler);

export { app };
