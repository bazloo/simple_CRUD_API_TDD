import { ServerResponse } from 'http';

export default function setDefaultHeaders(res: ServerResponse): typeof res {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  return res;
}
