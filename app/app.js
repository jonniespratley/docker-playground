const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const responseTime = require('response-time')
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const routes = require('./routes/index');
const users = require('./routes/users');
const config = require('./config')();

const app = express();

app.use(responseTime())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.redis = config.redisClient;

app.use(session({
    secret: 'sessionSecret',
    resave: false,
    saveUninitialized: true,
    store: new RedisStore({
        client: config.redisClient,
        prefix: 'session:',
        logErrors: true
    }),
    cookie: {
        //secure: true
    }
}))

app.use('/?', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;