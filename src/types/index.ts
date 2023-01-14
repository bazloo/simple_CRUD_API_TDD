export interface UserModel {
    id?: string;
    username: string;
    age: number;
    hobbies: string[] | [];
}

export interface BaseDocument {
 id?: string;
}

export interface BaseCollection {
    collectionName: string;
    collectionSchema: { required: Array<string>, types: Record<string, any> },
    store: object;
}

export interface ResponseError extends Error {
    code?: string;
    message: string;
}

export interface IncomingBody {
    body?: UserModel;
    params?: object;
}
