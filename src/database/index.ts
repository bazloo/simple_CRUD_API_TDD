import Model from './Model';
import Database from './Database';
import { UserModel } from '../types';

const store = {};
const userCollection = new Model('users', store);

// eslint-disable-next-line import/prefer-default-export
const db = new Database([userCollection], store);

export default db;
