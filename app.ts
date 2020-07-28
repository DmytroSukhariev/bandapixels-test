import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { mountRoutes } from './routes';

export const app = express();

app.use(
    cors(),
    helmet(),
    express.json()
);

mountRoutes(app);