const express = require('express');
const router = express.Router();

//@routen POST api/user
//@description Register a user
//@access Public
router.post('/', (req, res) => {
  res.send('register a user');
});

module.exports = router;
