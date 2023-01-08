import { createServer, IncomingMessage, ServerResponse } from 'http';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  switch (req.url) {
    case '/api/users': {
      if (req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        const users = { users: [{ id: 1 }] };
        res.write(JSON.stringify(users));
        res.end();
      }
      break;
    }
    default: {
      res.statusCode = 404;
      res.end();
    }
  }
});
export = server;
