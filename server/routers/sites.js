const express = require('express');
const router = express.Router();
const Site = require('./../models/site');
const auth = require("./../middleware/auth");
const multer  = require('multer');
const upload = multer();


router.post('/sites', upload.single('img'), async function (req, res) {

  if(!req.body) return res.sendStatus(500);

  console.log(req.body)

  const {link, text, dev} = req.body;

  try {
    const site = new Site({
      image: req.file.buffer, link, text, dev
    });

    await site.save();

    res.send(site)
  }catch (e) {
    console.log(e);
    res.send(500)
  }
});

module.exports = router;
