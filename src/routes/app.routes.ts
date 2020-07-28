import Router from 'express-promise-router';

import { helloWorldHandler } from './app.handlers';

export const appRouter = Router();

appRouter.get('/', helloWorldHandler);