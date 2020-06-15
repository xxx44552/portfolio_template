const express = require('express');
const router = express.Router();
const Site = require('./../models/site');
const auth = require("./../middleware/auth");
const mongoose = require('mongoose');

router.post('/admin', auth, function (req, res) {

  res.sendStatus(200)

});


module.exports = router;
