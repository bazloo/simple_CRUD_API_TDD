import { IncomingMessage, ServerResponse } from 'http';
import routes from '../routes';
import { bodyParser, setDefaultHeaders, parseUrl } from '../utils';
import { UserModel as UserSchema, IncomingBody } from '../types';

export default async function requestHandler(req: IncomingMessage & IncomingBody, res: ServerResponse) {
  const [route, urlParam] = parseUrl(req.url);

  if (!route) {
    return routes.notExist(req, res);
  }

  req.params = { id: urlParam };

  setDefaultHeaders(res);

  switch (req.method?.toLowerCase()) {
    case 'get':
      routes[route].get(req, res);
      break;
    case 'post':
      req.body = await bodyParser(req) as UserSchema;
      routes[route].post(req, res);
      break;
    case 'put':
      req.body = await bodyParser(req) as UserSchema;
      routes[route].put(req, res);
      break;
    case 'delete':
      routes[route].delete(req, res);
      break;
    default:
      return routes.notExist(req, res);
  }
  return '';
}
