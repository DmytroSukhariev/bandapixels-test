import { Application } from 'express';
import { appRouter } from './app.routes';

export const mountRoutes = (app: Application) => {
    app.use('/', appRouter);
}


