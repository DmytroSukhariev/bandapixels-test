import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { resSend } from '../lib';
import { badRequest } from '../constants/status-codes';

export const validationErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    const valdiationResult = validationResult(req);
    
    if (!valdiationResult.isEmpty()) {
        resSend(res, badRequest, { errors: valdiationResult.array() });
        return;
    }

    next();
}