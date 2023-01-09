import { IncomingMessage, ServerResponse } from 'http';
import url from 'node:url';
import routes from '../routes';
import bodyParser from "../utils/bodyParser";

export default async function requestHandler(req: IncomingMessage & { body?: string }, res: ServerResponse) {
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
      req.body = await bodyParser(req) as string;
      // @ts-ignore
      routes[route].post(req, res);
      break;
    case 'put':
      // @ts-ignore
      routes[route].put(req, res);
      break;
    case 'delete':
      // @ts-ignore
      routes[route].delete(req, res);
      break;
    default:
      // TODO set 500 status
      return routes.notExist(req, res);
  }
  return '';
}
