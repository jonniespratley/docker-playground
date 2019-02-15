/**
 * 
Running 10s test @ http://localhost:9000
10 connections

Stat         Avg     Stdev   Max    
Latency (ms) 0.48    1.43    74.79  
Req/Sec      10296.4 1885.81 12251  
Bytes/Sec    2.01 MB 366 kB  2.4 MB 

103k requests in 10s, 20.2 MB read
 */
const express = require('express');
const cluster = require('cluster');
const http = require('http');
const app = express();

app.use(require('morgan')('dev'));

app.set('port', process.env.PORT || 9000);


if (cluster.isMaster) {

  // Keep track of http requests
  let numReqs = 0;
  setInterval(() => {
    console.log(`numReqs = ${numReqs}`);
  }, 1000);

  // Count requests
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }

  // Start workers and listen for messages containing notifyRequest
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

} else {

  // Worker processes have a http server.
  app.get('/', (req, res) => {
    process.send({ cmd: 'notifyRequest' });
    res.send('Hello World');
  });
  var server = app.listen(app.get('port'), function () {
    console.log('Worker %d -', cluster.worker.id, 'Server listening on 127.0.0.1:', app.get('port'));
  });
}