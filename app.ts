import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import { get } from 'config';

import { mountRoutes } from './routes';

export const app = express();

app.use(
    cors(),
    helmet(),
    express.json()
);

( async () => {
    try {
        await mongoose.connect(get('mongo_url'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        mountRoutes(app);
    } catch (e) {
        throw new Error(e);
    }
})();