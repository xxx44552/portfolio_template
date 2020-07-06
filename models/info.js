const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoScheme = new Schema({
  image: {
    type: Buffer,
    required: true
  },
  adminName: {
    type: String,
    required: true
  },
  adminProf: {
    type: String,
    required: true
  },
  adminTitle: {
    type: String,
    required: true
  },
  adminText: {
    type: String,
    required: true
  },
  adminAbout: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    default: 'Title'
  }
});

const Info = mongoose.model("Info", infoScheme);

module.exports = Info;
