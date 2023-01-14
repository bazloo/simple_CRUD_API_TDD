import { validate as uuidValidate } from 'uuid';

import UserModel from '../database';

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
        res.write(JSON.stringify({ message: 'User with such id doesn\'t exist' }));
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
    } catch (error) {
      if (error instanceof Error) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: error.message }));
      }
      res.statusCode = 500;
      return res.end(JSON.stringify({ message: 'Internal error' }));
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
    } catch (error) {
      if (error instanceof Error) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: error.message }));
      }
      res.statusCode = 500;
      return res.end(JSON.stringify({ message: 'Internal error' }));
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

    const deletedUser = await UserModel.delete({ id: req.params.id });
    res.write(JSON.stringify(deletedUser));
    return res.end();
  }
}
