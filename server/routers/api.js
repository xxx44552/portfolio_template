const express = require('express');
const router = express.Router();
const Site = require('./../models/site');
const Info = require('./../models/info');

router.get('/api/sites', async function (req, res) {

  try{
    let sites = await Site.find();

    sites.forEach(el => el.image = null);

    res.send(sites)
  }catch (e) {
    res.sendStatus(500)
  }
});

router.get('/api/info', async function (req, res) {

  try{
    let info = await Info.findOne();
    info.image = null;
    console.log(info)
    res.send(info)
  }catch (e) {
    res.sendStatus(500)
  }
});


module.exports = router;
