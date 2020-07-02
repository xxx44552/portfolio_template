const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
  image: {
    type: Buffer,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  dev: {
    type: Array,
    required: true
  }
});

const Site = mongoose.model("Site", userScheme);

module.exports = Site;
