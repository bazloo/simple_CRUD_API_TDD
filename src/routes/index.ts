import { Routes } from '../types/index';
import UsersService from "../servises/UsersService";

const routes: Routes = {
  'api/users': {
    get: (req, res) => UsersService.get(req, res),
    post: (req, res) => UsersService.post(req, res),
    put: (req, res) => UsersService.put(req, res),
    delete: (req, res) => UsersService.delete(req, res),
  },
  notExist: (req, res) => {
    res.statusCode = 404;
    res.end();
  },
};

export default routes;
