const express = require('express');
const router = express.Router();
const Site = require('./../models/site');
const auth = require("./../middleware/auth");
const mongoose = require('mongoose');


router.delete('/delSite/:id',  async function (req, res) {

  try {
    await Site.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id)});
    res.send(200)
  }catch (e) {
    console.log(e);
    res.send(400)
  }

});

module.exports = router;
