import { Application } from 'express';
import { appRouter } from './app/app.routes';

export const mountRoutes = (app: Application) => {
    app.use('/', appRouter);
}


