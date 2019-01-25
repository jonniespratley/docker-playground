var redis = require('redis');

module.exports = () => {
    var host = process.env.REDIS_HOST || 'localhost';
    var port = process.env.REDIS_PORT || 6379;
    var client;

    if (!client) {
        try {
            client = redis.createClient({
                port: port,
                host: host,
                prefix: 'nodejs-app',
                retry_strategy: function (options) {
                    console.log('retry_strategy', options);
                    if (options.error && options.error.code === 'ECONNREFUSED') {
                        // End reconnecting on a specific error and flush all commands with
                        // a individual error
                        return new Error('The server refused the connection');
                    }
                    if (options.total_retry_time > 1000 * 60 * 60) {
                        // End reconnecting after a specific timeout and flush all commands
                        // with a individual error
                        return new Error('Retry time exhausted');
                    }
                    if (options.attempt > 10) {
                        // End reconnecting with built in error
                        return undefined;
                    }
                    // reconnect after
                    return Math.min(options.attempt * 100, 10000);
                }
            });

        } catch (err) {
            console.log('Error connecting to redis', err);
        }
    }
    return {
        host: host,
        port: port,
        redisClient: client
    }
};