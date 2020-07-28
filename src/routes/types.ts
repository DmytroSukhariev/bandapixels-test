class Tagged<T> { private _secret_tag: T | undefined }

type Nominal<Type, Tag> = Type & Tagged<Tag>;

export type Id = Nominal<string, 'Id'>;

export type Password = Nominal<string, 'Password'>;

export type Token = Nominal<string, 'Token'>;

export type Latency = Nominal<number, 'Latency'>;

export type IdType = Nominal<'email' | 'number', 'IdType'>;

export type ResponseStatus = Nominal<number, 'ResponseStatus'>;

export type User = Nominal<{
    id:  Id,
    password: Password,
    id_type: IdType,
}, 'User'>;