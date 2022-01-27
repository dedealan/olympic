const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    status: 'success',
    message: 'Welcome'
  });
});

module.exports = router;
