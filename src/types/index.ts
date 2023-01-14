import { IncomingMessage, ServerResponse } from 'http';

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

enum RequestMethods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete'
}

type RequestHandler = (req:IncomingMessage, res:ServerResponse) => void;

type RouteMethods = Record<string, Record<RequestMethods, RequestHandler> | RequestHandler>;

export interface Routes extends RouteMethods {
    'notExist': RequestHandler,
}

export interface ResponseError extends Error {
    code?: string;
    message: string;
}
