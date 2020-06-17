const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');

const Contact = require('../models/Contact');

//@routen GET api/contact
//@description get all users contacts
//@access private
router.get('/', auth, async (req, res) => {
  try {
    const contact = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@routen post api/contact
//@description add new contact
//@access private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        type,
        phone,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

//@routen PUT api/contact/:id
//@description update
//@access private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  //Build a contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (type) contactFields.type = type;
  if (phone) contactFields.phone = phone;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ msg: 'Contact not found' });
    }
    //make sure user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields
      },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@routen DELETE api/contact/:id
//@description delete contact
//@access private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ msg: 'Contact not found' });
    }
    //make sure user owns the contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
