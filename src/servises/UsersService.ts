import { validate as uuidValidate } from 'uuid';
import { ResponseError } from '../types';
import UserModel from '../database';

const USER_DOES_NOT_EXIST_MSG = 'User with such id doesn\'t exist';
const NOT_FOUND = 'NOT_FOUND';

export default class UsersService {
  static async get(req, res) {
    let users;

    if (req.params.id) {
      if (!uuidValidate(req.params.id)) {
        res.statusCode = 400;
        res.write(JSON.stringify({ message: 'Invalid user id' }));
        return res.end();
      }

      users = await UserModel.find({ id: req.params.id });

      if (users.length) {
        res.write(JSON.stringify(users));
        res.end();
      } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: USER_DOES_NOT_EXIST_MSG }));
        res.end();
      }
    } else {
      users = await UserModel.find();
      res.write(JSON.stringify(users));
      res.end();
    }
  }

  static async post(req, res) {
    let newUser;

    try {
      newUser = await UserModel.insert(req.body || {});
    } catch (e) {
      const error = e as ResponseError;
      res.statusCode = error.code === NOT_FOUND ? 404 : 400;
      const message = error.code === NOT_FOUND ? USER_DOES_NOT_EXIST_MSG : error.message;
      return res.end(JSON.stringify({ message }));
    }

    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    return res.end();
  }

  static async put(req, res) {
    if (!uuidValidate(req.params.id)) {
      res.statusCode = 400;
      res.write(JSON.stringify({ message: 'Invalid user id' }));
      return res.end();
    }

    let updatedUser;

    try {
      updatedUser = await UserModel.update({ id: req.params.id }, req.body || {});
    } catch (e) {
      const error = e as ResponseError;
      res.statusCode = error.code === 'NOT_FOUND' ? 404 : 400;
      const message = error.code === 'NOT_FOUND' ? USER_DOES_NOT_EXIST_MSG : error.message;
      return res.end(JSON.stringify({ message }));
    }

    res.write(JSON.stringify(updatedUser));
    return res.end();
  }

  static async delete(req, res) {
    if (!uuidValidate(req.params.id)) {
      res.statusCode = 400;
      res.write(JSON.stringify({ message: 'Invalid user id' }));
      return res.end();
    }

    let deletedUser;

    try {
      deletedUser = await UserModel.delete({ id: req.params.id });
    } catch (e) {
      const error = e as ResponseError;
      res.statusCode = error.code === 'NOT_FOUND' ? 404 : 400;
      const message = error.code === 'NOT_FOUND' ? USER_DOES_NOT_EXIST_MSG : error.message;
      return res.end(JSON.stringify({ message }));
    }

    res.write(JSON.stringify(deletedUser));
    return res.end();
  }
}
