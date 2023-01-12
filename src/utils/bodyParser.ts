import { IncomingMessage } from 'http';

export default function bodyParser(req:IncomingMessage) {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      if (chunk) {
        chunks.push(chunk);
      }
    });

    req.on('end', () => {
      let body;

      try {
        body = JSON.parse(Buffer.concat(chunks).toString());
      } catch (error) {
        reject(error);
      }

      resolve(body);
    });
  });
}
