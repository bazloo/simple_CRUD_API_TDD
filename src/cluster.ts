import http from 'http';
import cluster from 'node:cluster';
import os from 'os';
import dotenv from 'dotenv';
import getServerInstance from "./server";

dotenv.config();

const numCores = os.cpus().length;
const startingPort = Number(process.env.PORT);

let currentWorkerIndex = 0;
let worker;

if (cluster.isMaster) {
  for (let i = 0; i < numCores; +1) {
    cluster.fork();
  }
  // Create a load balancer server
  const loadBalancer = http.createServer((req, res) => {
    worker = cluster.workers ? cluster.workers[currentWorkerIndex] : undefined;
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
  const server = getServerInstance();
  server.listen(startingPort + currentWorkerIndex, () => {
    console.log(`Server listening by worker - ${worker.id}`);
  });
}
