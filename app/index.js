// index.js
// run with node --experimental-worker index.js on Node.js 10.x
const {
  MessageChannel,
  Worker
} = require('worker_threads')



const { port1, port2 } = new MessageChannel();
port1.on('message', (message) => console.log('received', message));
port2.postMessage({ foo: 'bar' });

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./service.js', {
      workerData
    });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}

function delay() {
  return new Promise(resolve => setTimeout(resolve, 300));
}

async function delayedLog(item) {
  // notice that we can await a function
  // that returns a promise
  await delay();
  console.log(item);
  const result = await runService({
    url: item
  });
  return result;
}


async function processArray(array) {
  // map array to promises
  const promises = array.map(delayedLog);
  // wait until all promises are resolved
  await Promise.all(promises);
  console.log('Done!');
}

async function run() {
  //const result = await runService('world')
  try {
    const result = await processArray([
      'https://httpbin.org/headers',
      'https://httpbin.org/delay/5',
      'https://httpbin.org/headers',
      'https://httpbin.org/delay/5',
    ]);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

run().catch(err => console.error(err))