import { createServer, IncomingMessage, ServerResponse } from 'http';

const app = createServer((request: IncomingMessage, response: ServerResponse) => {
  switch (request.url) {
    case '/api/users': {
      if (request.method === 'GET') {
        response.setHeader('Content-Type', 'application/json');
        const users = { users: [{ id: 1 }] };
        response.write(JSON.stringify(users));
        response.end();
      }
      break;
    }
    default: {
      response.statusCode = 404;
      response.end();
    }
  }
});
export = app;
