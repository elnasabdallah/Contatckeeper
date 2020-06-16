const express = require('express');
const router = express.Router();

//@routen GET api/contact
//@description get all users contacts
//@access private
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

//@routen post api/contact
//@description add new contact
//@access private
router.post('/', (req, res) => {
  res.send('Add contact');
});

//@routen PUT api/contact/:id
//@description update
//@access private
router.put('/', (req, res) => {
  res.send('update contact');
});

//@routen DELETE api/contact/:id
//@description delete contact
//@access private
router.delete('/', (req, res) => {
  res.send('delete contact');
});
module.exports = router;
