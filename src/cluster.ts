import http from 'http';
// eslint-disable-next-line import/no-unresolved
import cluster from 'node:cluster';
import os from 'os';
import dotenv from 'dotenv';
import getServerInstance from './server';

dotenv.config();

const numCores = os.cpus().length;
const startingPort = Number(process.env.PORT);

let currentWorkerIndex = 0;
let worker;

if (cluster.isPrimary) {
  for (let i = 0; i < numCores; i += 1) {
    cluster.fork();
  }

  const loadBalancer = http.createServer((req, res) => {
    const proxyReq = http.request({
      host: 'localhost',
      port: startingPort + currentWorkerIndex,
      path: req.url,
      method: req.method,
      headers: req.headers,
    }, (proxyRes) => {
      proxyRes.pipe(res);
    });
    req.pipe(proxyReq);
    currentWorkerIndex = (currentWorkerIndex + 1) % numCores;
  });

  loadBalancer.listen(startingPort, () => {
    console.log(`Load balancer started on: ${startingPort}`);
  });
} else {
  let workerId;
  if (cluster.worker) {
    workerId = cluster.worker.id;
  }

  const server = getServerInstance(`Request is caught by the worker - ${workerId}`);

  server.listen(startingPort + workerId, () => {
    console.log(`Worker is listening port: ${startingPort + workerId}`);
  });
}
