import { createServer, IncomingMessage, ServerResponse } from 'http';
import requestHandler from './controllers/RequestHandler';
import { IncomingBody } from './types';

export default function getServerInstance(workerMessage?: string) {
  return createServer((req: IncomingMessage & IncomingBody, res: ServerResponse) => {
    if (workerMessage) {
      console.log(workerMessage);
    }

    requestHandler(req, res)
      .catch((error) => {
        console.error(error);
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Internal error' }));
      });
  });
}

export const server = getServerInstance();
