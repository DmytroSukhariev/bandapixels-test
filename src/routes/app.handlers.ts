import { Request, Response } from 'express';

import { Id, Password, IdType, Token, Latency } from './types';

import { resSend } from './common';

import * as S from './status-codes';

export const signInHandler = (req: Request, res: Response) => {
    const { id, password } = req.body as { id: Id, password: Password };

    console.log(id, password);

    const token = 'some token' as Token;

    resSend(res, S.ok, { token });
}

export const signUpHandler = (req: Request, res: Response) => {
    const { id, password } = req.body as { id: Id, password: Password };

    console.log(id, password);

    const token = 'some token' as Token;

    resSend(res, S.created, { token });
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