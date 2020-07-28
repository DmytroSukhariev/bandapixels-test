import { Request, Response } from 'express';

export const helloWorldHandler = (_: Request, res: Response) => {
    res.status(200).json({ message: 'Hello world!' });
}