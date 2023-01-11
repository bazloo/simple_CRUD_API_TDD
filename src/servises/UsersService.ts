import UserModel from '../database';

export default class UsersService {
  static async get(req, res) {
    let users;
    console.log('req.params.id', req.params.id);
    if (req.params.id) {
      users = await UserModel.find({ id: req.params.id }); //TODO change status ?
      res.write(JSON.stringify(users));
      res.end();
    } else {
      users = await UserModel.findAll();
      res.write(JSON.stringify(users));
      res.end();
    }
  }

  static async post(req, res) {
    // make validation

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

  static put(req, res) {}

  static delete(req, res) {}
}
