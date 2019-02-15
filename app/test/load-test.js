/**
 * curl -X GET \
  https://js-apphub.predix-apphub-prod.run.aws-usw02-pr.ice.predix.io/microapp-1/api/db \
  
  -H 'Cookie: predix-io-session=qL1063v5mOA7vvd7iMgsvg..|1451248876|GMSuqfnnJTmmtdVig9v3tA..|VYnoBRqPzwULEQKUhXie2BnjKS0.; _ga=GA1.2.1730347126.1549577542; test=s%3Ap6Erso7IIrocgrG18PhXoM3fV0cRARXT.VPTNo8s7taEqCJe8PRwnsh2r0tJ0dvZYb7lkmiFBAc8; ajs_user_id=null; ajs_group_id=null; ajs_anonymous_id=%2262dcc231-ba2b-4c45-88d7-b16d00d388b4%22; _fbp=fb.1.1549828821569.1654498287; pxh-drawer-open=true; cloud.auth=s%3A99799d6c-cdeb-417a-80b4-4f71eadae4d8.ZoemR6WHnp1NvqxvzIICdTHsJaa3yInAn9m8x7h35g0; BNUXBRYG=02eb4a889c-7933-4bKm4fZrut7YKLr1pCPEImyVMRGpkyzAToGrUaJ0nKJykV99TIxPxZOVoiBA2WrQhtau0' \
  -H 'Postman-Token: 249b5ced-cb73-4cf3-b095-0f5c8d618aa7' \
  -H 'Referer: https://js-apphub.predix-apphub-prod.run.aws-usw02-pr.ice.predix.io/microapp-1/' \
  -H 'cache-control: no-cache'
 */
const loadtest = require('loadtest');
const {dump} = require('dumper.js');

function statusCallback(error, result, latency) {
  console.log('--------------------------------------------');
  console.log('Request #: ', result.requestIndex);
  console.log(`Request Path: ${result.path}`)
  console.log(`Request Method: ${result.method}`)
  console.log('Request elapsed: ', result.requestElapsed);
  console.log(`Response Status: ${result.statusCode}`)
  console.log(`Response Body: ${result.body}`)
  dump(result);
  //console.log('Request loadtest() instance index: ', result.instanceIndex);
}

const options = {
  //url: 'http://localhost:8000',
  //url: 'https://js-apphub.predix-apphub-prod.run.aws-usw02-pr.ice.predix.io/microapp-1/api/db',
  url: 'https://js-apphub.predix-apphub-prod.run.aws-usw02-pr.ice.predix.io/microapp-1/api/db/_all_docs?docType=contact',
  maxRequests: 100,
  maxSeconds: 60,
  concurrency: 10,
  requestsPerSecond: null,
  statusCallback: statusCallback,
  //method: 'POST',
  contentType: 'application/json',
  body: {
    title: 'Test Document'
  },
  headers: {
    Cookie: 'cloud.auth=s%3A99799d6c-cdeb-417a-80b4-4f71eadae4d8.ZoemR6WHnp1NvqxvzIICdTHsJaa3yInAn9m8x7h35g0;',
    Accept: 'application/json'
  }
};

loadtest.loadTest(options, function (error) {
  if (error) {
    return console.error('Got an error: %s', error);
  }
  console.log('\n\nTests run successfully');
});