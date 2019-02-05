const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    const client = req.app.locals.redis;
    if (client) {
        client.incr('counter', function (err, result) {
            if (err) {
                return next(err);
            }
            res.render('index', {
                title: 'Docker Express + Redis',
                counter: result
            });
        });
    } else {
        res.render('index', {
            title: 'Docker Express + Redis',
            error: 'Error connecting to redis'
        });
    }
});
module.exports = router;