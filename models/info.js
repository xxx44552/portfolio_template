const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');

const infoScheme = new Schema({
  image: {
    type: Buffer
  },
  adminName: {
    type: String,
    required: true,
    default: 'Name'
  },
  adminProf: {
    type: String,
    required: true,
    default: 'Prof'
  },
  adminTitle: {
    type: String,
    required: true,
    default: 'Title'
  },
  adminText: {
    type: String,
    required: true,
    default: 'Text lorem'
  },
  adminAbout: {
    type: String,
    required: true,
    default: 'Text about'
  },
  title: {
    type: String,
    required: true,
    default: 'Title'
  },
  email: {
    type: String,
    required: true,
    validate: [ isEmail, 'invalid email' ]
  }
});

const Info = mongoose.model("Info", infoScheme);

module.exports = Info;
