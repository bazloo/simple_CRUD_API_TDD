import { IncomingMessage, ServerResponse } from 'http';
import url from 'node:url';
import { Routes } from '../types/index';

const ROUTES: Routes = {
  'api/users': {
    get: () => { console.log('notExist'); },
    post: () => { console.log('notExist'); },
    put: () => { console.log('notExist'); },
    delete: () => { console.log('notExist'); },
  },
  notExist: () => { console.log('notExist'); },
};

export default function requestHandler(req: IncomingMessage, res: ServerResponse) {
  // parse url string
  let parsedUrl;
  if (req.url) {
    parsedUrl = url.parse(req.url, true);
  }
  let route = parsedUrl.pathname;
  route = route.replace(/^\/+|\/+$/g, '');

  // maybe check url first
  if (!ROUTES.path) {
    // TODO set 404 status
    return ROUTES.notExist(req, res);
  }

  // maybe set common headers to res obj
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // switch case depends on method
  // invoke route
  switch (req.method?.toLowerCase()) {
    case 'get':
      break;
    case 'post':
      break;
    case 'put':
      break;
    case 'delete':
      break;
    default:
      // TODO set 500 status
      return ROUTES.notExist(req, res);
  }
  return '';
}
