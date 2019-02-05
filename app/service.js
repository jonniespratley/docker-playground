const {
  workerData,
  parentPort,
  isMainThread
} = require('worker_threads');

const request = require('request');

//Test fetching data from remote api.
console.log('service.js', workerData, parentPort);

const {
  url
} = workerData;

function fetchData(){
  request.get(url, (err, resp) => {
    if(err){
      throw err;
    }
    parentPort.postMessage({
      ok: true,
      data: resp
    });
  });
  
}

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
//parentPort.postMessage({ hello: workerData });
