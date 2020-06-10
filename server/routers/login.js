const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

router.post('/login', async function (req, res) {

  if(!req.body) return res.sendStatus(500);

  const {login, password} = req.body;

  try {
    const user = await User.findOne({login: login});
    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch) {
      const token = await user.generateAuthToken();
      res.send({token});
    }else {
      res.status(401).send({ error: 'Please authenticate.' });
    }
  }catch (e) {
    res.send({error: true})
  }
});

module.exports = router;
