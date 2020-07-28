import Router from 'express-promise-router';


import { emailOrNumberValidator
       , validationErrorHandler
       , userExistsValidator } from '../../middleware';
import { signInHandler
       , signUpHandler
       , infoHandler
       , latancyHandler
       , logOutHandler } from './app.handlers';

export const appRouter = Router();



appRouter.post('/signin', signInHandler);
appRouter.post('/signup', emailOrNumberValidator, userExistsValidator, validationErrorHandler, signUpHandler);
appRouter.get('/info', infoHandler);
appRouter.get('/latency', latancyHandler);
appRouter.get('/logout', logOutHandler);