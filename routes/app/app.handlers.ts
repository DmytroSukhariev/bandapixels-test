import { Request, Response } from 'express';
import * as argon2 from 'argon2';
import config from 'config';
import jwt from 'jsonwebtoken';

import { Id, Password, IdType, Token, Latency, User } from '../../types';

import { resSend, errorHandlingSender, generateMessage } from '../../lib';

import * as S from '../../constants/status-codes';

import * as dao from './app.dao';

const jwtSign = (id: Id): Token => {
    return jwt.sign(
        { id },
        config.get('jwtSecret'),
        { expiresIn: `${ config.get('token_expiration') as number + 1 }m` }
    ) as Token;
}

const argonHash = async (password: Password): Promise<Password> => {
    return await argon2.hash(`${ config.get('salt') }${ password }`) as Password;
}

const argonVerify = async (hash: Password, password: Password): Promise<boolean> => {
    return await argon2.verify(hash, `${ config.get('salt') }${ password }`);
}

export const signInHandler = async (req: Request, res: Response) => {
    await errorHandlingSender(res, async () => {
        const { id: inputId, password: inputPassword } = req.body as { id: Id, password: Password };

        const userFromDb = await dao.findUserById(inputId);

        if (!userFromDb) {
            resSend(res, S.unauthorized, generateMessage('invalid login or password'));
            return;
        }

        const { id, password } = userFromDb as { id: Id, password: Password };

        const passwordVerificationResult = await argonVerify(password, inputPassword);
        
        if (!passwordVerificationResult) {
            resSend(res, S.unauthorized, generateMessage('invalid login or password'));
            return;
        } 

        const token = jwtSign(id);

        await dao.createToken(token);

        resSend(res, S.created, { token });
    });
}

export const signUpHandler = async (req: Request, res: Response) => {
    await errorHandlingSender(res, async () => {
        const { id, password: rawPassword, id_type } = req.body as { id: Id, password: Password, id_type: IdType };

        const hashedPassword = await argonHash(rawPassword);

        const newUser = { id, id_type, password: hashedPassword } as User;

        const token = jwtSign(id)

        await Promise.all([dao.createUser(newUser), dao.createToken(token)]);

        resSend(res, S.ok, { token });
    });
}

export const infoHandler = async (req: Request, res: Response) => {
    await errorHandlingSender(res, async () => {
        const { id: inputId } = req.body as { id: Id };

        const userFromDb = await dao.findUserById(inputId);

        if (!userFromDb) {
            resSend(res, S.unauthorized, generateMessage('invalid login or password'));
            return;
        }

        const { id, id_type } = userFromDb as { id: Id, id_type: IdType };

        resSend(res, S.created, { id, id_type });
    });
}

export const latancyHandler = async (req: Request, res: Response) => {
    await errorHandlingSender(res, async () => {
        const latency = await dao.getLatency(config.get('hostToPing'));
        resSend(res, S.ok, { latency });
    });
}

export const logOutHandler = async (req: Request, res: Response) => {
    await errorHandlingSender(res, async () => {
        const { all: allParam } = req.query;
        const { token: myToken } = req.body as { token: Token };

        const all = (allParam === 'true');

        if (all) {
            const allTokens = await dao.getAllTokensAndRemove();
            await dao.addMultipleTokensToBlocklist(allTokens);
        } else {    
            await dao.addSingleTokenToBlocklist(myToken);
        }

        resSend(res, S.ok);
    });
}