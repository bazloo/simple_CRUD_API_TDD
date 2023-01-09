import db from '../database/';

export default class UsersService {
  static async get(req, res) {
    // @ts-ignore
    const users = await db.users.findAll();
    res.write(JSON.stringify(users));
    res.end();
  }

  static post(req, res) {
    console.log(req.body);
  }

  static put(req, res) {}

  static delete(req, res) {}
}
