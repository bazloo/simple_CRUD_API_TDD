import Model from './Model';
import Database from './Database';
import { UserModel as UserSchema } from '../types';

const store = {};
const UserModel = new Model<UserSchema>('users', store);
export const db = new Database([UserModel], store);

export default UserModel;
