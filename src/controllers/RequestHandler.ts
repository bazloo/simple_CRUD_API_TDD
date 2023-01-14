import { IncomingMessage, ServerResponse } from 'http';
import url from 'node:url';
import routes from '../routes';
import { bodyParser, setDefaultHeaders } from '../utils';
import { UserModel as UserSchema } from '../types';
import { userRequired, userFieldsTypes as userSchema } from '../database';

export default async function requestHandler(req: IncomingMessage & { body?: UserSchema; params?: object }, res: ServerResponse) {
  // parse url string
  let parsedUrl;
  if (req.url) {
    parsedUrl = url.parse(req.url, true);
  }
  let sanitizedUrl = parsedUrl.pathname;
  sanitizedUrl = sanitizedUrl.replace(/^\/+|\/+$/g, '');

  const possibleRoutes: string[] = [];

  Object.keys(routes).forEach((existingRoute) => {
    if (sanitizedUrl.includes(existingRoute)) {
      possibleRoutes.push(existingRoute);
    }
  });

  // maybe check url first
  if (possibleRoutes.length !== 1) {
    // TODO set 404 status
    return routes.notExist(req, res);
  }

  const possibleUrlParam = sanitizedUrl // in our case, we expected the id only
    .replace(possibleRoutes[0], '')
    .replace(/^\/+|\/+$/g, '');

  req.params = { id: possibleUrlParam };

  setDefaultHeaders(res);

  // switch case depends on method
  // invoke route
  switch (req.method?.toLowerCase()) {
    case 'get':
      // @ts-ignore
      routes[possibleRoutes[0]].get(req, res);
      break;
    case 'post':
      req.body = await bodyParser(req) as UserSchema;
      // @ts-ignore
      routes[possibleRoutes[0]].post(req, res);
      break;
    case 'put':
      req.body = await bodyParser(req) as UserSchema;
      // @ts-ignore
      routes[possibleRoutes[0]].put(req, res);
      break;
    case 'delete':
      // @ts-ignore
      routes[possibleRoutes[0]].delete(req, res);
      break;
    // TODO internal server error
    default:
      // TODO set 500 status
      return routes.notExist(req, res);
  }
  return '';
}
