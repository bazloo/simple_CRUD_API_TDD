import { createServer, IncomingMessage, ServerResponse } from 'http';
import requestHandler from './controllers/RequestHandler';
import { UserModel } from './types';

const server = createServer((req: IncomingMessage & { body?: UserModel }, res: ServerResponse) => {
  requestHandler(req, res)
    .catch((error) => {
      console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Internal error' }));
    });
});
export = server;
