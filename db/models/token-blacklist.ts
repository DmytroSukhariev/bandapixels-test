import { Schema, model } from 'mongoose';
import { get } from 'config';

const expirationTime = get('token_expiration');

const schema = new Schema({
    token: { type: String, required: true, index: { unique: true } },
    updatedAt: { type: Date, default: Date.now(), index: { expires: `${expirationTime}m` } },
});


export const TokenBlacklistModel = model('TokenBlacklist', schema);