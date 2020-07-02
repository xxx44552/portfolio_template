const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const auth = require('./../middleware/auth');
const mongoose = require('mongoose');

router.get('/logout', auth, async function (req, res) {

  if(!req.body) return res.sendStatus(500);

  try {
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(req.user._id)});
    user.tokens = [];
    await user.save();
    res.redirect('/login');
  }catch (e) {
    console.log(e)
    res.sendStatus(400)
  }
});

module.exports = router;
