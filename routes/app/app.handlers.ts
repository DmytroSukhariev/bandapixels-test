import { Request, Response } from 'express';
import * as argon2 from 'argon2';
import config from 'config';
import jwt from 'jsonwebtoken';

import { Id, Password, IdType, Token, Latency, User } from '../../types';

import { resSend, errorHandlingSender } from '../../lib';

import * as S from '../../constants/status-codes';

import * as dao from './app.dao';

export const signInHandler = async (req: Request, res: Response) => {
    
    await errorHandlingSender(res, async () => {
        const { id, password } = req.body as { id: Id, password: Password };

        console.log(id, password);

        const token = 'some token' as Token;

        await dao.updateToken(token);

        console.log('token updated');

        resSend(res, S.created, { token });
    });
}

export const signUpHandler = async (req: Request, res: Response) => {
    await errorHandlingSender(res, async () => {
        const { id, password: rawPassword, id_type } = req.body as { id: Id, password: Password, id_type: IdType };

        const hashedPassword = await argon2.hash(`${config.get('salt')}${rawPassword}`);

        const newUser = { id, id_type, password: hashedPassword } as User;

        console.log(newUser);

        const token = jwt.sign(
            { id },
            config.get('jwtSecret'),
            { expiresIn: `${config.get('token_expiration') as number + 1}m` }
        ) as Token;

        await dao.createUser(newUser);

        await dao.createToken(token);

        resSend(res, S.ok, { token });
    });
}

export const infoHandler = (req: Request, res: Response) => {
    const id = 'some id' as Id;
    const id_type =  'some id_type' as IdType;

    resSend(res, S.ok, { id, id_type });
}

export const latancyHandler = (req: Request, res: Response) => {
    const latency = 111 as Latency;

    resSend(res, S.ok, { latency });
}

export const logOutHandler = (req: Request, res: Response) => {
    const { all: allParam } = req.query;

    const all = (allParam === 'true');

    console.log(all);

    resSend(res, S.ok);

}