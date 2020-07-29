import Router from 'express-promise-router';
import { body } from 'express-validator';

import { emailOrNumberValidator
       , validationErrorHandler
       , userExistsValidator } from '../../middleware';
import { signInHandler
       , signUpHandler
       , infoHandler
       , latancyHandler
       , logOutHandler } from './app.handlers';

export const appRouter = Router();

const inputsValidator = [
       body('id').trim().exists().isLength({ min: 1, max: 40 }),
       body('password').trim().exists().isLength({ min: 8, max: 40 }),
];

appRouter.post('/signin', inputsValidator, validationErrorHandler, signInHandler);
appRouter.post('/signup', inputsValidator, emailOrNumberValidator, userExistsValidator, validationErrorHandler, signUpHandler);
appRouter.get('/info', infoHandler);
appRouter.get('/latency', latancyHandler);
appRouter.get('/logout', logOutHandler);