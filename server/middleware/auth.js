const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('./../config');

const auth = async(req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error()
    }
  console.log(token, '--pass')
    req.user = user;
    req.authToken = token;
    next()
  } catch (e) {
    //console.log(e, '---auth-error');
    console.log(`${req.protocol}//:${req.hostname}:8080/login`);
    //res.status(401).send({ error: 'Please authenticate.' })
    //res.redirect(`${req.hostname}:8080/login`)
    res.redirect(req.body.redirectTo || '/')
  }
};

module.exports = auth;
