const cpuCount = require('os').cpus().length;
const PORT = process.env.PORT || 8080;
const CLUSTER_COUNT = process.env.CLUSTER_COUNT || 1;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const redbird = new require('redbird')({
	port: PORT,
  cluster: CLUSTER_COUNT,
  secure: false
});
const APP_URL = 'https://apphub-microapp-seed.run.aws-usw02-pr.ice.predix.io';
//redbird.register('localhost', APP_URL);
redbird.register('localhost/api', `${APP_URL}/api`);
redbird.register('localhost/app', APP_URL);