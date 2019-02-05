const request = require('request');
module.exports = function (url, callback) {

  request.get(url, (err, resp, body) => {
    callback(err, body);
  });

};