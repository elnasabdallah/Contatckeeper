const express = require('express');
const router = express.Router();

//@routen GET api/auth
//@description get logged in user
//@access private

router.get('/', (req, res) => {
  res.send('get logged in user');
});

//@routen POST api/auth
//@description auth user and get token
//@access public

router.post('/', (req, res) => {
  res.send('log in user');
});

module.exports = router;
