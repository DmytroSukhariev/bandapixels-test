import { Response } from 'express';

import { ResponseStatus } from './types';

export const resSend = <T>(res: Response, status: ResponseStatus, body?: T) => {
    if (!!body) {
        res.status(status).json(body);
        return;
    }
    res.status(status).send();
    
}