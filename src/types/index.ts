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
    store: [];
}
