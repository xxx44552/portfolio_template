const express = require('express');
const router = express.Router();
const auth = require("./../middleware/auth");
const Info = require('./../models/info');
const multer  = require('multer');
const upload = multer();

router.post('/info', upload.single('image'), async function (req, res) {

  if(!req.body) return res.sendStatus(500);

  const {adminName, adminProf, adminTitle, adminText, adminAbout} = req.body;

  try {
    const test = await Info.findOne()
    const updates = Object.keys(req.body).filter(i=>req.body[i] !== null)
    const allowedUpdates = ['adminName', 'adminProf', 'adminTitle', 'adminText', 'adminAbout'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }
    if(test) {
      updates.forEach((update) =>  test[update] = req.body[update]);
      if(req.file)test.image = req.file.buffer
      await test.save();
      res.send(test)

    }else {
      const info = new Info({
        image: req.file.buffer, adminName, adminProf, adminTitle, adminText, adminAbout
      });
      await info.save();
      res.send(info);
    }
    res.sendStatus(200)
  }catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
});

module.exports = router;
