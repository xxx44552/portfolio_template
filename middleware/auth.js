const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('./../config');

const auth = async(req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) throw new Error();

    req.user = user;
    req.authToken = token;
    user.isAdmin ? next() : res.status(403).send({ error: 'You must have administrator rights.' });

  } catch (e) {
    res.redirect(`/login`)
  }
};

module.exports = auth;
