const express = require('express');
const router = express.Router();
const userService = require('./service');

router.get('/getUser', getUser);

module.exports = router;

function getUser(req, res, next) {
   userService.getUser({})
       .then((result) => res.json(result) )
       .catch(err => next(err));
}
