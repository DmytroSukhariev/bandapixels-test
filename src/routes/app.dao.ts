import { UserModel } from '../../db/models/user';
import { TokenModel } from '../../db/models/token';
import { TokenBlacklistModel } from '../../db/models/token-blacklist';
import { User, Token } from './types';

export const createUser = async (user: User) => {
    const newUser = new UserModel(user);
    await newUser.save();
}

export const createToken = async (token: Token) => {
    const newToken = new TokenModel({ token });
    await newToken.save();
}

export const updateToken = async (token: Token) => {
    await TokenModel.update({ token }, {  updatedAt: Date.now() });
}