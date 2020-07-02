const express = require('express');
const router = express.Router();
const User = require('./../models/user');

router.post('/reg', async function (req, res) {
  if(!req.body) return res.sendStatus(500);

  const {login, password, email} = req.body;
  const test = await User.findOne();

  try {
    const user = new User({
      login,
      password,
      email,
      isAdmin: !test ? true : false
    });
    const token = await user.generateAuthToken();
    res.send({token})
  }catch (e) {
    console.log(e)
    res.send('Reg err')
  }
});


module.exports = router;
