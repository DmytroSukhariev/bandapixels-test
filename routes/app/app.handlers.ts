import { Request, Response } from 'express';

import { Id, Password, IdType, Token, Latency, User } from '../types';

import { resSend, errorHandlingSender } from '../common';

import * as S from '../status-codes';

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
        const { id, password } = req.body as { id: Id, password: Password };

        const id_type = 'email' as IdType;

        const newUser = { id, id_type, password } as User;

        await dao.createUser(newUser);

        const token = 'some token' as Token;

        await dao.createToken(token);

        console.log('success');

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