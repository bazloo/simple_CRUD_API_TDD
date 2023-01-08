import db from '../database/';

export default class UsersService {
  static async get(req, res) {
    if (db.users) {
      const users = await db.users.findAll();
      res.write(JSON.stringify({ users }));
      res.end();
    }
  }

  static post(req, res) {}

  static put(req, res) {}

  static delete(req, res) {}
}
