import UserModel from '../database';

export default class UsersService {
  static async get(req, res) {
    let users;

    if (req.params.id) {
      users = await UserModel.find({ id: req.params.id });
      res.write(JSON.stringify(users));
      res.end();
    } else {
      users = await UserModel.findAll();
      res.write(JSON.stringify(users));
      res.end();
    }
  }

  static async post(req, res) {
    //TODO make validation

    if (!req.body) {
      res.end();
    }

    let newUser;
    try {
      newUser = await UserModel.insert(req.body);
    } catch (e) {
      res.statusCode = 500;
      res.end();
    }

    res.write(JSON.stringify(newUser));
    res.end();
  }

  static async put(req, res) {
    if (!req.body || !req.params.id) {
      res.end();
    }

    let updatedUser;
    try {
      updatedUser = await UserModel.update({ id: req.params.id }, req.body);
    } catch (e) {
      res.statusCode = 500;
      res.end();
    }

    res.write(JSON.stringify(updatedUser));
    res.end();
  }

  static async delete(req, res) {
    if (!req.params.id) {
      res.end();
    }

    const deletedUser = await UserModel.delete({ id: req.params.id });
    res.write(JSON.stringify(deletedUser));
    res.end();
  }
}
