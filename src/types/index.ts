export interface UserModel {
    id?: string | number;
    userName: string;
    age: number;
    hobbies: string[] | [];
}

export interface BaseDocument extends Record<string, unknown>{
 id?: string | number;
 [key: string]: unknown;
}

export interface BaseCollection {
    collectionName: string;
    store: [];
}
