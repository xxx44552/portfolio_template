const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('./../config');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userScheme = new Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  restore: String
},
{
  timestamps: true
});

userScheme.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.secret);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userScheme.methods.restoreToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.secret);

  user.restore = token;
  await user.save();

  return token;
};

userScheme.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next();
});

const User = mongoose.model("User", userScheme);

module.exports = User;
