const express = require('express');
const router = express.Router();
const User = require('./../models/user');



router.post('/reg', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  console.log(req.body)
  const {login, password, email} = req.body;
  try {
    const user = new User({
      login,
      password,
      email
    });
    const token = await user.generateAuthToken();
    console.log(token)
    res.send({token})
  }catch (e) {
    console.log(e)
    res.send('Reg err')
  }
});


module.exports = router;
