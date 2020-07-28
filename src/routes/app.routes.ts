import Router from 'express-promise-router';

import { signInHandler
       , signUpHandler
       , infoHandler
       , latancyHandler
       , logOutHandler } from './app.handlers';

export const appRouter = Router();

appRouter.post('/signin', signInHandler);
appRouter.post('/signup', signUpHandler);
appRouter.get('/info', infoHandler);
appRouter.get('/latency', latancyHandler);
appRouter.get('/logout', logOutHandler);