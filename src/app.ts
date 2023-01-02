import express, {
  Express, json, Request, Response,
} from 'express';

const app: Express = express();

app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/api/users', (req: Request, res: Response) => {
  res.send({ test: 'test' });
});

export = app;
