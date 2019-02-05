const express = require('express');
const router = express.Router();
const workerFarm = require('worker-farm');
const workers = workerFarm(require.resolve('./worker'));
let ret = 0;

let urls = [
  'https://httpbin.org/delay/1000',
  'http://faker.hook.io/?property=helpers.createCard',
  'http://faker.hook.io/?property=lorem.paragraphs',
  'https://httpbin.org/delay/5000',
  'http://faker.hook.io/?property=helpers.userCard',
  'http://faker.hook.io/?property=lorem.paragraphs',
  'https://httpbin.org/delay/2000',
  'http://faker.hook.io/?property=lorem.paragraphs',
  'http://faker.hook.io/?property=lorem.paragraphs',
  'https://httpbin.org/delay/1000',
  'http://faker.hook.io/?property=lorem.paragraphs'
  
];


urls.forEach((url, i) => {
  workers(url, function (err, outp) {
    console.log(outp)
    if (i === urls.length - 1){
      console.log('Workers ending');
      workerFarm.end(workers);
    }
      
  });
});