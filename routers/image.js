const express = require('express');
const router = express.Router();
const Site = require('./../models/site');
const Info = require('./../models/info');
const mongoose = require('mongoose');

router.get('/pic/:id/image', async (req, res) => {
  try {
    const site = await Site.findOne({ _id: mongoose.Types.ObjectId(req.params.id)});

    if(!site || !site.image) throw new Error('Error image');

    res.set('Content-Type', 'image/jpg');
    res.send(site.image);
  }catch (e) {
    console.log(e);
    res.send(500)
  }
});

router.get('/pic/ava', async (req, res) => {
  try {
    const info = await Info.findOne();

    if(!info || !info.image) throw new Error('Error ava');

    res.set('Content-Type', 'image/jpg');
    res.send(info.image);
  }catch (e) {
    console.log(e);
    res.send(500)
  }
});

module.exports = router;
