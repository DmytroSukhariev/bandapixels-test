import { Response } from 'express';

import { ResponseStatus } from '../types';

import { serverError } from '../constants/status-codes';

export const resSend = <T>(res: Response, status: ResponseStatus, body?: T) => {
    if (!!body) {
        res.status(status).json(body);
        return;
    }
    res.status(status).send();
    
}

export const errorHandlingSender = async (
    res: Response, 
    requestHandler: () => Promise<void>, 
    message = 'Something went wrong'
) => {
    try {
        await requestHandler();
    } catch (e) {
        console.error(e);
        resSend(res, serverError, generateMessage(message));
    }
}

export const generateMessage = (message: string) => ({ message });