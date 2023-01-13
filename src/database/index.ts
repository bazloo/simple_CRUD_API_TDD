import Model from './Model';
import Database from './Database';
import { UserModel as UserSchema } from '../types';

export const userRequired: Array<keyof UserSchema> = ['username', 'age', 'hobbies'];

export const userFieldsTypes = {
  username: 'string',
  age: 'number',
  hobbies: ['string'],
};

const store = {};
const UserModel = new Model<UserSchema>('users', {
  required: userRequired,
  types: userFieldsTypes,
}, store);

export const db = new Database([UserModel], store);

export default UserModel;
