const requestProxy = require('express-request-proxy');
const log = require('debug')('nodejs-scratch:server');
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const debug = require('debug');
const redis = require('redis');

const cache = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost'
});

cache.on("error", function (err) {
  console.log("Error " + err);
});


if (cluster.isMaster && process.env.ENABLE_CLUSTER_MODE) {

  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('online', function (worker) {
      console.log(`Worker ${worker.id} is online`);
    });
  cluster.on('listening', function (worker, address) {
    console.log("A worker is now connected to " + address.address + ":" + address.port);
    console.log(`Worker ${worker.id} is listening on ${address.port}`);
  });
  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + process.pid + ' died');
    cluster.fork();
  });
} else {

  const app = express();


  app.set('host', process.env.HOST || 'localhost');
  app.set('port', process.env.HOST || port);
  
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use('/', express.static(__dirname + '/public'));

  app.get('/api', (req, res, next) => {
    res.status(200).send({
      message: 'welcome to api',
      process: process.pid
    })
  })
  log('enabling request proxy');

    app.all('/api/proxy/*', (req, res, next) => {
        console.log('proxy', req.url, req.query);
        let url = req.query.url;
        
        return requestProxy({
            cache: cache,
            cacheMaxAge: 60,
            url: `${url}/api/*`,
            headers: {
              'X-Custom-Header': process.env.SOMEAPI_CUSTOM_HEADER || 'Local-to-Remote'
            }
          })(req, res, next)
    });

  let server = http.createServer(app);

    server.listen(app.get('port'), function () {
      console.log(`Express server listening at http://${app.get('host')}:${app.get('port')}` );
      console.log('Worker ' + process.pid + ' running on', app.get('port'));
    });
}