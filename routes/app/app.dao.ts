import { UserModel } from '../../db/models/user';
import { TokenModel } from '../../db/models/token';
import { TokenBlocklistModel } from '../../db/models/token-blocklist';
import { User, Token, Id, IdType, Password } from '../../types';

export const createUser = async (user: User): Promise<void> => {
    const newUser = new UserModel(user);
    await newUser.save();
}

export const createToken = async (token: Token): Promise<void> => {
    const newToken = new TokenModel({ token });
    await newToken.save();
}

export const updateToken = async (token: Token): Promise<void> => {
    await TokenModel.updateOne({ token }, {  updatedAt: Date.now() });
}

export const checkUserExists = async (id: Id): Promise<boolean> => {
    const userExists = await UserModel.exists({ id });
    return userExists;
}

export const findUserById = async (userId: Id): Promise<User | null> => {
    const dbUser = await UserModel.findOne({ id: userId });
    
    if (!dbUser) {
        return null;
    } 
    
    const { id, id_type, password } = dbUser as unknown as User;

    if (!id || !id_type || !password) {
        throw new Error('Ivalid db schema');
    }
    
    const user = { id, id_type, password };

    return user as User;
}

export const checkTokenInBlocklist = async (token: Token): Promise<boolean> => {
    return await TokenBlocklistModel.exists({ token });
}

export const addSingleTokenToBlocklist = async (token: Token): Promise<void> => {
    const newBlocklistedToken = new TokenBlocklistModel({ token });
    await newBlocklistedToken.save();
}

export const addMultipleTokensToBlocklist = async (tokens:  Token[]): Promise<void> => {
    const tokensToBlock = tokens.map(token => ({ token }));
    await TokenBlocklistModel.insertMany(tokensToBlock);
}

export const getAllTokensAndRemove = async (): Promise<Token[]> => {
    const tokensFromDb = await TokenModel.find({}, 'token');
    await TokenModel.find().remove();
    const tokens = tokensFromDb.map((dbEntity) => {
        const { token } = dbEntity as unknown as { token: Token }
        return token;
    })
    return tokens;
}