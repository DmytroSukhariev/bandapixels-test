import { body } from 'express-validator';

import { Id } from '../types';

const validateEmail = (id: Id) => {
    if (id.length >= 40) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(id).toLowerCase());
    }
    return false;
}

const validatePhoneNumber = (id: Id) => {
    if (id.length >= 14) {
        const re = /^\+?3?8?(0\d{9})$/;
        return re.test(String(id).toLowerCase());
    }
    return false;
}

export const emailOrNumberValidator = body('id')
    .custom((value: any, { req }: { req: any }) => {
        const isNumber = validatePhoneNumber(value);
        const isEmail = validateEmail(value);

        if (isEmail || isNumber) {
            req.body.id_type = (isEmail) ? 'email' : 'number';
            return true;
        } else {
            throw Error('Login must be email or ukrainian phone number');
        }
    });