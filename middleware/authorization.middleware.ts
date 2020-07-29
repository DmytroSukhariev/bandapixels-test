import jwt, { Secret, VerifyCallback } from 'jsonwebtoken';
import config from 'config';
import { Request, Response, NextFunction } from 'express';

import { resSend, generateMessage } from '../lib';
import { Id } from '../types';
import * as S from '../constants/status-codes';
import * as dao from '../routes/app/app.dao';

export const authorizationMiddleware = (updateToken: boolean) => async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    const { token } = req.body;

    if (!token) {
        resSend(res, S.unauthorized, generateMessage('Token must be in body'));
        return;
    }

    const secret = config.get('jwtSecret') as Secret;

    const verifyCallback: VerifyCallback = async (err, decoded) => {


        if (err) {
            console.error(err);
            resSend(res, S.unauthorized, generateMessage('Token is invalid'));
            return;
        } 

        const { id } = decoded as { id: Id };

        if (!id) {
            console.error('Decoded id is absent!');
            resSend(res, S.unauthorized, generateMessage('Token is invalid'));
            return;
        } 

        const tokenIsInBlacklist = await dao.checkTokenInBlacklist(token);

        if (tokenIsInBlacklist) {
            resSend(res, S.unauthorized, generateMessage('Authorization failed'));
            return;
        }

        if (updateToken) {
            await dao.updateToken(token);
        }

        req.body.id = id;
        next();
    }

    jwt.verify(token, secret, verifyCallback);
}