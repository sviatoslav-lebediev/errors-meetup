import Joi from 'joi';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { createValidator } from 'express-joi-validation';
import { findUser, createUser } from '../services/user-service';
import { BadRequest } from '../errors/bad-request';
import { InternalServerError } from '../errors/internal-server-error';

const usersRouter = Router();
const createUserExpressValidators = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
];

const createUserJoiValidator = createValidator({ passError: true }).body(
    Joi.object({
        email: Joi.string().email({ tlds: false }).required(),
        password: Joi.string().min(4).max(20).required(),
    })
);

usersRouter.get('/:id', async (req, res, next) => {
    if (req.params.id === 'unhandled-operational') {
        Promise.reject(new BadRequest([{ message: 'Unhandled async error, operational' }]));

        return res.json({});
    }

    if (req.params.id === 'unhandled-not-operational') {
        Promise.reject(new InternalServerError('Unhandled async error, not operational'));

        return res.json({});
    }

    const user = await findUser(req.params.id);

    res.json(user);
});

usersRouter.post('/joi-validator', createUserJoiValidator, async (req, res, next) => {
    const { email, password } = req.body;

    const user = await createUser({ email, password });

    res.json(user);
});

usersRouter.post('/express-validator', createUserExpressValidators, async (req, res, next) => {
    const { email, password } = req.body;

    validationResult(req).throw();

    const user = await createUser({ email, password });

    res.json(user);
});

export { usersRouter };
