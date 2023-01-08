import { IncomingMessage, ServerResponse } from 'http';
import url from 'node:url';
import routes from '../routes';

export default function requestHandler(req: IncomingMessage, res: ServerResponse) {
  // parse url string
  let parsedUrl;
  if (req.url) {
    parsedUrl = url.parse(req.url, true);
  }
  let route = parsedUrl.pathname;
  route = route.replace(/^\/+|\/+$/g, '');

  // maybe check url first
  if (!routes[route]) {
    // TODO set 404 status
    return routes.notExist(req, res);
  }

  // maybe set common headers to res obj
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // switch case depends on method
  // invoke route
  switch (req.method?.toLowerCase()) {
    case 'get':
      // @ts-ignore
      routes[route].get(req, res);
      break;
    case 'post':
      break;
    case 'put':
      break;
    case 'delete':
      break;
    default:
      // TODO set 500 status
      return routes.notExist(req, res);
  }
  return '';
}
