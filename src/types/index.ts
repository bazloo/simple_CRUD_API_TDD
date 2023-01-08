import { IncomingMessage, ServerResponse } from 'http';

export interface UserModel {
    id?: string | number;
    userName: string;
    age: number;
    hobbies: string[] | [];
}

export interface BaseDocument {
 id?: string | number;
}

export interface BaseCollection {
    collectionName: string;
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
