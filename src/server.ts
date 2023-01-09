import { createServer, IncomingMessage, ServerResponse } from 'http';
import requestHandler from './controllers/RequestHandler';

const server = createServer((req: IncomingMessage & { body?: string }, res: ServerResponse) => {
  requestHandler(req, res);
});
export = server;
