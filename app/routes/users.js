const faker = require('faker');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/?', function(req, res) {
  let count = req.query.count || 10;
  let users = [];
  for (let i = 0; i < count; i++) {
    const user = faker.helpers.userCard();
    users.push(user);
    
  }
  res.status(200).send(users);
});

module.exports = router;
