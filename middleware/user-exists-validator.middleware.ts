import { body } from 'express-validator';

import { Id } from '../types';
import { checkUserExists } from '../routes/app/app.dao';

export const userExistsValidator = body('id')
    .custom(async (value: any) => {
        if (await checkUserExists(value as Id)) {
            throw new Error('User with this id alredy exists');
        };
    });