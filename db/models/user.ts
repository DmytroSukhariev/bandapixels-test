import { Schema, model } from 'mongoose';

const schema = new Schema({
    id: { type: String, required: true, unique: true },
    id_type: { type: String, required: true },
    password: { type: String, required: true }
});

export const UserModel = model('User', schema);