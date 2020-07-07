const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Info = require('./../models/info');

router.post('/reg', async function (req, res) {
  if(!req.body) return res.sendStatus(500);
  console.log(req.body)

  const {login, password, email} = req.body;

  const test = await User.findOne();

  try {
    const user = new User({
      login,
      password,
      email,
      isAdmin: !test ? true : false
    });
    if(!test) {
      const info = await Info.findOne();
      if(!info) {
        const info = new Info({
          email
        });
        await info.save()
      }
    }
    await user.save();
    const token = await user.generateAuthToken();
    res.send({token})
  }catch (e) {
    console.log(e, 'er');
    res.send('Reg err')
  }
});


module.exports = router;
