import { createServer, IncomingMessage, ServerResponse } from 'http';
import requestHandler from './controllers/RequestHandler';
import { UserModel } from "./types";

const server = createServer((req: IncomingMessage & { body?: UserModel }, res: ServerResponse) => {
  requestHandler(req, res);
});
export = server;
